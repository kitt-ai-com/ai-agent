#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
매주 월요일 업체별 메타광고 리포트 배치 생성 스크립트

사용법:
  python3 scripts/weekly_report.py --fetch                              # API 수집 + 분석
  python3 scripts/weekly_report.py --fetch --email                      # 수집 + 분석 + 이메일
  python3 scripts/weekly_report.py --fetch --upload --email             # 수집 + 분석 + Notion + 이메일
  python3 scripts/weekly_report.py --fetch --days 14                    # 최근 14일 데이터
  python3 scripts/weekly_report.py --client "리바스인테리어"              # 특정 업체만
  python3 scripts/weekly_report.py --dry-run                            # 테스트
"""

import json
import os
import sys
import glob
import subprocess
import smtplib
import ssl
import argparse
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

try:
    import certifi
    SSL_CONTEXT = ssl.create_default_context(cafile=certifi.where())
except ImportError:
    SSL_CONTEXT = ssl.create_default_context()

# 프로젝트 루트 경로 (scripts/ 상위)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONFIG_PATH = os.path.join(PROJECT_ROOT, "config", "clients.json")
ANALYZE_SCRIPT = os.path.join(PROJECT_ROOT, "scripts", "analyze_meta_ad_full.py")
FETCH_SCRIPT = os.path.join(PROJECT_ROOT, "scripts", "fetch_meta_ads.py")


def load_env():
    """환경변수 로드"""
    env_path = os.path.join(PROJECT_ROOT, ".env")
    env_vars = {}
    if os.path.exists(env_path):
        with open(env_path, "r") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, value = line.split("=", 1)
                    env_vars[key.strip()] = value.strip().strip('"').strip("'")
    return env_vars


def load_clients(filter_name=None):
    """clients.json에서 업체 목록 로드"""
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        clients = json.load(f)

    clients = [c for c in clients if c.get("enabled", True)]

    if filter_name:
        clients = [c for c in clients if c["name"] == filter_name]
        if not clients:
            print(f"  '{filter_name}' 업체를 찾을 수 없습니다.")
            sys.exit(1)

    return clients


def find_latest_csv(csv_dir):
    """디렉토리에서 가장 최근 CSV 파일 찾기"""
    abs_dir = os.path.join(PROJECT_ROOT, csv_dir)

    if not os.path.exists(abs_dir):
        return None

    csv_files = glob.glob(os.path.join(abs_dir, "*.csv"))
    if not csv_files:
        return None

    return max(csv_files, key=os.path.getmtime)


def fetch_meta_data(client, days=7, dry_run=False):
    """Meta API에서 광고 데이터 수집 → CSV 저장"""
    account_id = client.get("ad_account_id", "")
    csv_dir = os.path.join(PROJECT_ROOT, client["csv_dir"])

    if not account_id or account_id == "act_XXXXXXXXX":
        print(f"    ad_account_id 미설정 → API 수집 건너뜀")
        return None

    date_str = datetime.now().strftime("%Y%m%d")
    filename = f"{client['name']}_{date_str}.csv"

    currency = client.get("currency", "USD")

    cmd = [
        sys.executable, FETCH_SCRIPT,
        "--account", account_id,
        "--days", str(days),
        "--output", csv_dir,
        "--filename", filename,
        "--currency", currency,
    ]

    if dry_run:
        print(f"    [DRY-RUN] {' '.join(cmd)}")
        return os.path.join(csv_dir, filename)

    result = subprocess.run(cmd, capture_output=True, text=True, cwd=PROJECT_ROOT)

    if result.returncode != 0:
        print(f"    API 수집 실패:")
        if result.stderr:
            print(f"    {result.stderr}")
        if result.stdout:
            print(f"    {result.stdout}")
        return None

    print(result.stdout)
    csv_path = os.path.join(csv_dir, filename)
    return csv_path if os.path.exists(csv_path) or dry_run else None


def run_analysis(csv_path, output_dir, dry_run=False):
    """analyze_meta_ad_full.py 실행"""
    abs_output = os.path.join(PROJECT_ROOT, output_dir)

    cmd = [
        sys.executable, ANALYZE_SCRIPT,
        "--csv", csv_path,
        "--output", abs_output,
    ]

    if dry_run:
        print(f"    [DRY-RUN] {' '.join(cmd)}")
        return True

    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"    분석 실패:")
        print(f"    {result.stderr}")
        return False

    print(result.stdout)
    return True


def upload_to_notion(output_dir, dry_run=False):
    """output 디렉토리의 리포트를 Notion에 업로드"""
    abs_output = os.path.join(PROJECT_ROOT, output_dir)
    upload_script = os.path.join(PROJECT_ROOT, "upload-notion.js")

    upload_targets = [
        "1페이지_요약.md",
        "분석_리포트.md",
        "실행_체크리스트.md",
    ]

    uploaded = 0
    for filename in upload_targets:
        filepath = os.path.join(abs_output, filename)
        if not os.path.exists(filepath):
            continue

        if dry_run:
            print(f"    [DRY-RUN] node upload-notion.js {filepath}")
            uploaded += 1
            continue

        cmd = ["node", upload_script, filepath]
        result = subprocess.run(cmd, capture_output=True, text=True, cwd=PROJECT_ROOT)

        if result.returncode == 0:
            print(f"    Notion 업로드 완료: {filename}")
            uploaded += 1
        else:
            print(f"    Notion 업로드 실패: {filename}")
            print(f"    {result.stderr}")

    return uploaded


def build_email_body(results, clients_data):
    """이메일 본문(HTML) 생성"""
    now = datetime.now().strftime("%Y-%m-%d %H:%M")

    html = f"""
<html>
<head>
<style>
  body {{ font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; color: #333; }}
  h2 {{ color: #1a73e8; }}
  table {{ border-collapse: collapse; width: 100%; margin: 16px 0; }}
  th {{ background: #1a73e8; color: white; padding: 10px 14px; text-align: left; }}
  td {{ padding: 8px 14px; border-bottom: 1px solid #e0e0e0; }}
  tr:nth-child(even) {{ background: #f8f9fa; }}
  .success {{ color: #0d904f; font-weight: bold; }}
  .failed {{ color: #d93025; font-weight: bold; }}
  .skipped {{ color: #9e9e9e; }}
  .summary-box {{ background: #e8f0fe; padding: 16px; border-radius: 8px; margin: 16px 0; }}
  .footer {{ color: #9e9e9e; font-size: 12px; margin-top: 24px; }}
</style>
</head>
<body>

<h2>메타광고 주간 리포트 배치 결과</h2>
<p>실행 시간: {now}</p>

<div class="summary-box">
  <strong>처리 요약</strong><br>
  성공: <span class="success">{len(results['success'])}개</span> &nbsp;|&nbsp;
  실패: <span class="failed">{len(results['failed'])}개</span> &nbsp;|&nbsp;
  건너뜀: <span class="skipped">{len(results['skipped'])}개</span>
</div>

<table>
  <tr>
    <th>업체</th>
    <th>상태</th>
    <th>통화</th>
    <th>광고 수</th>
    <th>총 지출</th>
    <th>총 클릭</th>
    <th>CTR</th>
  </tr>
"""

    for item in clients_data:
        status_class = "success" if item["status"] == "성공" else ("failed" if item["status"] == "실패" else "skipped")
        html += f"""  <tr>
    <td>{item['name']}</td>
    <td class="{status_class}">{item['status']}</td>
    <td>{item.get('currency', '-')}</td>
    <td>{item.get('ad_count', '-')}</td>
    <td>{item.get('spend', '-')}</td>
    <td>{item.get('clicks', '-')}</td>
    <td>{item.get('ctr', '-')}</td>
  </tr>
"""

    html += """</table>

<p class="footer">
  이 메일은 메타광고 주간 리포트 자동화 시스템에서 발송되었습니다.<br>
  상세 리포트는 각 업체별 output/meta-ad/ 폴더를 확인하세요.
</p>

</body>
</html>
"""
    return html


def read_summary_data(client):
    """업체별 1페이지 요약에서 핵심 수치 추출"""
    summary_path = os.path.join(PROJECT_ROOT, client["output_dir"], "1페이지_요약.md")
    csv_path = os.path.join(PROJECT_ROOT, client["output_dir"], "상세_데이터.csv")

    data = {
        "name": client["name"],
        "currency": client.get("currency", "USD"),
        "ad_count": "-",
        "spend": "-",
        "clicks": "-",
        "ctr": "-",
    }

    if os.path.exists(csv_path):
        try:
            import csv as csv_mod
            with open(csv_path, "r", encoding="utf-8-sig") as f:
                reader = csv_mod.DictReader(f)
                rows = list(reader)
                data["ad_count"] = str(len(rows))

                # 지출 컬럼 찾기
                spend_col = None
                click_col = None
                for col in rows[0].keys() if rows else []:
                    if "지출 금액" in col:
                        spend_col = col
                    if col == "링크 클릭":
                        click_col = col

                if spend_col and rows:
                    total_spend = sum(float(r.get(spend_col, 0) or 0) for r in rows)
                    cur = client.get("currency", "USD")
                    if cur == "KRW":
                        data["spend"] = f"₩{total_spend:,.0f}"
                    else:
                        data["spend"] = f"${total_spend:,.2f}"

                if click_col and rows:
                    total_clicks = sum(float(r.get(click_col, 0) or 0) for r in rows)
                    data["clicks"] = f"{total_clicks:,.0f}"

                # CTR 계산
                impressions_total = sum(float(r.get("노출", 0) or 0) for r in rows)
                if click_col and impressions_total > 0:
                    total_clicks_val = sum(float(r.get(click_col, 0) or 0) for r in rows)
                    data["ctr"] = f"{total_clicks_val / impressions_total * 100:.2f}%"

        except Exception:
            pass

    return data


def send_email(results, clients, clients_data, dry_run=False):
    """배치 결과를 이메일로 전송"""
    env = load_env()

    smtp_host = env.get("SMTP_HOST", "smtp.naver.com")
    smtp_port = int(env.get("SMTP_PORT", "587"))
    smtp_user = env.get("SMTP_USER", "")
    smtp_pass = env.get("SMTP_PASS", "")
    email_to = env.get("EMAIL_TO", "kaiceo@naver.com")
    email_from = env.get("EMAIL_FROM", smtp_user)

    if not smtp_user or not smtp_pass:
        print("\n  이메일 전송 실패: SMTP_USER, SMTP_PASS가 .env에 설정되지 않았습니다.")
        print("  .env 파일에 다음을 추가하세요:")
        print('    SMTP_HOST="smtp.naver.com"')
        print('    SMTP_PORT="587"')
        print('    SMTP_USER="your_email@naver.com"')
        print('    SMTP_PASS="your_password"')
        print('    EMAIL_TO="kaiceo@naver.com"')
        return False

    now = datetime.now().strftime("%Y-%m-%d")
    subject = f"[메타광고] 주간 리포트 배치 결과 - {now} (성공 {len(results['success'])}개 / 실패 {len(results['failed'])}개)"

    if dry_run:
        print(f"\n  [DRY-RUN] 이메일 전송")
        print(f"    발신: {email_from}")
        print(f"    수신: {email_to}")
        print(f"    제목: {subject}")
        return True

    # 이메일 구성
    msg = MIMEMultipart("mixed")
    msg["Subject"] = subject
    msg["From"] = email_from
    msg["To"] = email_to

    # HTML 본문
    html_body = build_email_body(results, clients_data)
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    # 성공한 업체의 1페이지 요약 첨부
    for client in clients:
        if client["name"] not in results["success"]:
            continue
        summary_path = os.path.join(PROJECT_ROOT, client["output_dir"], "1페이지_요약.md")
        if os.path.exists(summary_path):
            with open(summary_path, "rb") as f:
                part = MIMEBase("application", "octet-stream")
                part.set_payload(f.read())
                encoders.encode_base64(part)
                filename = f"{client['name']}_1페이지_요약.md"
                part.add_header("Content-Disposition", f"attachment; filename*=UTF-8''{filename}")
                msg.attach(part)

    # SMTP 전송
    try:
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.starttls(context=SSL_CONTEXT)
        server.login(smtp_user, smtp_pass)
        server.sendmail(email_from, [email_to], msg.as_string())
        server.quit()
        print(f"\n  이메일 전송 완료 → {email_to}")
        return True
    except Exception as e:
        print(f"\n  이메일 전송 실패: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(description="업체별 메타광고 주간 리포트 배치 생성")
    parser.add_argument("--client", type=str, help="특정 업체만 실행 (예: 리바스인테리어)")
    parser.add_argument("--fetch", action="store_true", help="Meta API에서 데이터 자동 수집")
    parser.add_argument("--days", type=int, default=7, help="API 수집 기간 - 최근 N일 (기본: 7)")
    parser.add_argument("--upload", action="store_true", help="Notion 업로드도 실행")
    parser.add_argument("--email", action="store_true", help="결과를 이메일로 전송")
    parser.add_argument("--dry-run", action="store_true", help="실제 실행 없이 테스트")
    parser.add_argument("--csv", type=str, help="특정 CSV 파일 직접 지정 (단일 업체용)")

    args = parser.parse_args()

    print("=" * 70)
    print(f"  메타광고 주간 리포트 배치 생성")
    print(f"  실행 시간: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    if args.fetch:
        print(f"  데이터 소스: Meta API (최근 {args.days}일)")
    else:
        print(f"  데이터 소스: 로컬 CSV 파일")
    if args.email:
        print(f"  이메일 전송: 활성화")
    if args.dry_run:
        print(f"  모드: DRY-RUN (테스트)")
    print("=" * 70)

    clients = load_clients(args.client)
    print(f"\n  대상 업체: {len(clients)}개")
    for c in clients:
        print(f"    - {c['name']} ({c.get('ad_account_id', '계정 미설정')})")

    results = {"success": [], "failed": [], "skipped": []}

    for client in clients:
        name = client["name"]
        print(f"\n{'─' * 70}")
        print(f"  [{name}] 처리 시작")
        print(f"{'─' * 70}")

        csv_path = None

        # Step 1: 데이터 수집
        if args.fetch:
            print(f"\n  [1/3] Meta API 데이터 수집")
            csv_path = fetch_meta_data(client, args.days, args.dry_run)
            if not csv_path and not args.dry_run:
                print(f"    API 수집 실패 → 로컬 CSV로 폴백")

        # Step 2: CSV 파일 확인
        if not csv_path:
            if args.csv and args.client:
                csv_path = args.csv
            else:
                csv_path = find_latest_csv(client["csv_dir"])

        if not csv_path:
            print(f"  CSV 파일 없음 → 건너뜀")
            print(f"    경로: {client['csv_dir']}/")
            if args.fetch:
                print(f"    clients.json의 ad_account_id를 확인해주세요.")
            else:
                print(f"    CSV 파일을 넣거나 --fetch 옵션을 사용하세요.")
            results["skipped"].append(name)
            continue

        step = "[2/3]" if args.fetch else "[1/2]"
        print(f"\n  {step} CSV: {os.path.basename(csv_path)}")

        # Step 3: 분석 실행
        step = "[3/3]" if args.fetch else "[2/2]"
        print(f"\n  {step} 분석 실행 중...")
        success = run_analysis(csv_path, client["output_dir"], args.dry_run)

        if not success:
            results["failed"].append(name)
            continue

        results["success"].append(name)

        # Notion 업로드
        if args.upload:
            print(f"\n  Notion 업로드 중...")
            upload_to_notion(client["output_dir"], args.dry_run)

    # 결과 요약
    print(f"\n{'=' * 70}")
    print(f"  배치 완료 요약")
    print(f"{'=' * 70}")
    print(f"  성공: {len(results['success'])}개  {', '.join(results['success']) or '-'}")
    print(f"  실패: {len(results['failed'])}개  {', '.join(results['failed']) or '-'}")
    print(f"  건너뜀: {len(results['skipped'])}개  {', '.join(results['skipped']) or '-'}")
    print(f"\n  출력 경로: output/meta-ad/<업체명>/")
    print(f"{'=' * 70}")

    # 이메일 전송
    if args.email:
        print(f"\n{'─' * 70}")
        print(f"  이메일 전송")
        print(f"{'─' * 70}")

        # 업체별 요약 데이터 수집
        clients_data = []
        for client in clients:
            name = client["name"]
            if name in results["success"]:
                data = read_summary_data(client)
                data["status"] = "성공"
            elif name in results["failed"]:
                data = {"name": name, "status": "실패", "currency": "-", "ad_count": "-", "spend": "-", "clicks": "-", "ctr": "-"}
            else:
                data = {"name": name, "status": "건너뜀", "currency": "-", "ad_count": "-", "spend": "-", "clicks": "-", "ctr": "-"}
            clients_data.append(data)

        send_email(results, clients, clients_data, args.dry_run)


if __name__ == "__main__":
    main()
