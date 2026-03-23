#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
미친특가 일일 리포트 (D-1 + 주간 7일)

매일 실행되며 두 가지 리포트를 생성하여 이메일로 전송:
  1. 전일(D-1) 리포트 - 어제 하루 성과
  2. 주간(7일) 리포트 - 최근 7일 성과

사용법:
  python3 scripts/daily_michinteukga.py              # 실행 + 이메일
  python3 scripts/daily_michinteukga.py --dry-run    # 테스트
"""

import json
import os
import sys
import ssl
import smtplib
import subprocess
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

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FETCH_SCRIPT = os.path.join(PROJECT_ROOT, "scripts", "fetch_meta_ads.py")
ANALYZE_SCRIPT = os.path.join(PROJECT_ROOT, "scripts", "analyze_meta_ad_full.py")

CLIENT = {
    "name": "미친특가_카이",
    "ad_account_id": "act_638456822558812",
    "currency": "KRW",
}


def load_env():
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


def fetch_and_analyze(label, days, output_dir, dry_run=False):
    """데이터 수집 + 분석 실행, 성과 요약 dict 반환"""
    date_str = datetime.now().strftime("%Y%m%d")
    csv_dir = os.path.join(PROJECT_ROOT, "input", "meta-ad", "미친특가_카이")
    filename = f"미친특가_{label}_{date_str}.csv"
    abs_output = os.path.join(PROJECT_ROOT, output_dir)

    # 1) Fetch
    cmd_fetch = [
        sys.executable, FETCH_SCRIPT,
        "--account", CLIENT["ad_account_id"],
        "--days", str(days),
        "--output", csv_dir,
        "--filename", filename,
        "--currency", CLIENT["currency"],
    ]

    if dry_run:
        print(f"    [DRY-RUN] fetch {label}")
        return {"status": "성공", "ad_count": "-", "spend": "-", "clicks": "-", "ctr": "-"}

    result = subprocess.run(cmd_fetch, capture_output=True, text=True, cwd=PROJECT_ROOT)
    if result.returncode != 0:
        print(f"    API 수집 실패 ({label}):")
        print(f"    {result.stdout}")
        return None

    print(result.stdout)

    csv_path = os.path.join(csv_dir, filename)
    if not os.path.exists(csv_path):
        print(f"    CSV 파일 없음 ({label})")
        return None

    # 2) Analyze
    cmd_analyze = [
        sys.executable, ANALYZE_SCRIPT,
        "--csv", csv_path,
        "--output", abs_output,
    ]

    result = subprocess.run(cmd_analyze, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"    분석 실패 ({label}):")
        print(f"    {result.stderr}")
        return None

    print(result.stdout)

    # 3) 요약 데이터 추출
    summary = {"status": "성공", "ad_count": "-", "spend": "-", "clicks": "-", "ctr": "-"}
    csv_output = os.path.join(abs_output, "상세_데이터.csv")
    if os.path.exists(csv_output):
        try:
            import csv as csv_mod
            with open(csv_output, "r", encoding="utf-8-sig") as f:
                rows = list(csv_mod.DictReader(f))
                summary["ad_count"] = str(len(rows))

                spend_col = next((c for c in rows[0].keys() if "지출 금액" in c), None) if rows else None
                click_col = "링크 클릭"

                if spend_col and rows:
                    total = sum(float(r.get(spend_col, 0) or 0) for r in rows)
                    summary["spend"] = f"₩{total:,.0f}"
                if rows:
                    clicks = sum(float(r.get(click_col, 0) or 0) for r in rows)
                    summary["clicks"] = f"{clicks:,.0f}"
                    impressions = sum(float(r.get("노출", 0) or 0) for r in rows)
                    if impressions > 0:
                        summary["ctr"] = f"{clicks / impressions * 100:.2f}%"
        except Exception:
            pass

    return summary


def build_email(d1_summary, w7_summary):
    """HTML 이메일 본문 생성"""
    now = datetime.now().strftime("%Y-%m-%d %H:%M")

    def row_html(data):
        if not data:
            return '<td colspan="4" style="color:#d93025;">데이터 없음</td>'
        return f"""<td>{data.get('ad_count','-')}</td>
    <td>{data.get('spend','-')}</td>
    <td>{data.get('clicks','-')}</td>
    <td>{data.get('ctr','-')}</td>"""

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
  .period {{ font-weight: bold; color: #1a73e8; }}
  .footer {{ color: #9e9e9e; font-size: 12px; margin-top: 24px; }}
</style>
</head>
<body>

<h2>미친특가 일일 리포트</h2>
<p>실행 시간: {now}</p>

<table>
  <tr>
    <th>기간</th>
    <th>광고 수</th>
    <th>총 지출</th>
    <th>총 클릭</th>
    <th>CTR</th>
  </tr>
  <tr>
    <td class="period">전일 (D-1)</td>
    {row_html(d1_summary)}
  </tr>
  <tr>
    <td class="period">주간 (7일)</td>
    {row_html(w7_summary)}
  </tr>
</table>

<p>첨부 파일에서 상세 리포트를 확인하세요.</p>

<p class="footer">
  이 메일은 미친특가 일일 리포트 자동화 시스템에서 발송되었습니다.
</p>

</body>
</html>
"""
    return html


def send_email(d1_summary, w7_summary, dry_run=False):
    """이메일 전송"""
    env = load_env()
    smtp_host = env.get("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(env.get("SMTP_PORT", "587"))
    smtp_user = env.get("SMTP_USER", "")
    smtp_pass = env.get("SMTP_PASS", "")
    email_to = env.get("EMAIL_TO", "kaiceo@naver.com")
    email_from = env.get("EMAIL_FROM", smtp_user)

    if not smtp_user or not smtp_pass:
        print("  SMTP 설정 없음")
        return False

    now = datetime.now().strftime("%Y-%m-%d")
    subject = f"[미친특가] 일일 리포트 - {now}"

    if dry_run:
        print(f"  [DRY-RUN] 이메일: {subject} → {email_to}")
        return True

    msg = MIMEMultipart("mixed")
    msg["Subject"] = subject
    msg["From"] = email_from
    msg["To"] = email_to
    msg.attach(MIMEText(build_email(d1_summary, w7_summary), "html", "utf-8"))

    # 첨부: D-1 요약 + 주간 요약
    attachments = [
        ("output/meta-ad/미친특가_카이/일일", "미친특가_전일_1페이지_요약.md", "1페이지_요약.md"),
        ("output/meta-ad/미친특가_카이/주간", "미친특가_주간_1페이지_요약.md", "1페이지_요약.md"),
        ("output/meta-ad/미친특가_카이/일일", "미친특가_전일_분석_리포트.md", "분석_리포트.md"),
        ("output/meta-ad/미친특가_카이/주간", "미친특가_주간_분석_리포트.md", "분석_리포트.md"),
    ]

    for dir_path, attach_name, file_name in attachments:
        filepath = os.path.join(PROJECT_ROOT, dir_path, file_name)
        if os.path.exists(filepath):
            with open(filepath, "rb") as f:
                part = MIMEBase("application", "octet-stream")
                part.set_payload(f.read())
                encoders.encode_base64(part)
                part.add_header("Content-Disposition", f"attachment; filename*=UTF-8''{attach_name}")
                msg.attach(part)

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


def upload_to_notion(label, report_dir, dry_run=False):
    """노션에 리포트 업로드"""
    upload_script = os.path.join(PROJECT_ROOT, "scripts", "upload_notion_report.js")

    cmd = [
        "node", upload_script,
        "--client", CLIENT["name"],
        "--report-dir", report_dir,
        "--label", label,
    ]

    if dry_run:
        print(f"    [DRY-RUN] 노션 업로드: {CLIENT['name']} {label}")
        return True

    result = subprocess.run(cmd, capture_output=True, text=True, cwd=PROJECT_ROOT)
    if result.returncode != 0:
        print(f"    노션 업로드 실패:")
        if result.stderr:
            print(f"    {result.stderr}")
        return False

    print(result.stdout)
    return True


def main():
    parser = argparse.ArgumentParser(description="미친특가 일일 리포트 (D-1 + 주간)")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--no-email", action="store_true", help="이메일 전송 안함")
    parser.add_argument("--no-notion", action="store_true", help="노션 업로드 안함")
    args = parser.parse_args()

    print("=" * 70)
    print("  미친특가 일일 리포트 (D-1 + 주간)")
    print(f"  실행 시간: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    if args.dry_run:
        print("  모드: DRY-RUN")
    print("=" * 70)

    # D-1 리포트 (전일 1일)
    print(f"\n{'─' * 70}")
    print(f"  [1/2] 전일 (D-1) 리포트")
    print(f"{'─' * 70}")
    d1 = fetch_and_analyze("일일", 1, "output/meta-ad/미친특가_카이/일일", args.dry_run)

    # 주간 리포트 (7일)
    print(f"\n{'─' * 70}")
    print(f"  [2/2] 주간 (7일) 리포트")
    print(f"{'─' * 70}")
    w7 = fetch_and_analyze("주간", 7, "output/meta-ad/미친특가_카이/주간", args.dry_run)

    # 결과 요약
    print(f"\n{'=' * 70}")
    print(f"  결과 요약")
    print(f"{'=' * 70}")
    print(f"  전일(D-1): {'성공' if d1 else '실패'}")
    print(f"  주간(7일): {'성공' if w7 else '실패'}")

    # 노션 업로드
    if not args.no_notion:
        print(f"\n{'─' * 70}")
        print(f"  노션 업로드")
        print(f"{'─' * 70}")
        if d1:
            upload_to_notion("일일", "output/meta-ad/미친특가_카이/일일", args.dry_run)
        if w7:
            upload_to_notion("주간", "output/meta-ad/미친특가_카이/주간", args.dry_run)

    # 이메일 전송
    if not args.no_email:
        print(f"\n{'─' * 70}")
        print(f"  이메일 전송")
        print(f"{'─' * 70}")
        send_email(d1, w7, args.dry_run)


if __name__ == "__main__":
    main()
