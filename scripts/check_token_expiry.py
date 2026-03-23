#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Meta 액세스 토큰 만료일 체크 + 경고 이메일 전송

매일 실행되며, 만료 7일 전부터 경고 이메일을 발송합니다.

사용법:
  python3 scripts/check_token_expiry.py              # 체크 + 7일 이내면 이메일
  python3 scripts/check_token_expiry.py --warn-days 14  # 14일 전부터 경고
  python3 scripts/check_token_expiry.py --dry-run     # 테스트
"""

import os
import sys
import json
import ssl
import smtplib
import argparse
import urllib.request
import urllib.parse
import urllib.error
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

try:
    import certifi
    SSL_CONTEXT = ssl.create_default_context(cafile=certifi.where())
except ImportError:
    SSL_CONTEXT = ssl.create_default_context()

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GRAPH_API_BASE = "https://graph.facebook.com/v21.0"


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


def check_token_expiry(access_token, app_id, app_secret):
    """토큰 만료일 확인, 남은 일수 반환"""
    params = urllib.parse.urlencode({
        "input_token": access_token,
        "access_token": f"{app_id}|{app_secret}",
    })
    url = f"{GRAPH_API_BASE}/debug_token?{params}"

    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, context=SSL_CONTEXT) as resp:
            result = json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"  토큰 검사 API 오류: {e}")
        return None, None, False

    data = result.get("data", {})
    is_valid = data.get("is_valid", False)
    expires_at = data.get("expires_at", 0)

    if not is_valid:
        return None, 0, False

    if expires_at == 0:
        # 만료 없는 토큰 (시스템 사용자 토큰 등)
        return None, 9999, True

    exp_date = datetime.fromtimestamp(expires_at)
    remaining = (exp_date - datetime.now()).days

    return exp_date, remaining, is_valid


def send_warning_email(remaining_days, exp_date, is_expired, dry_run=False):
    """토큰 만료 경고 이메일 전송"""
    env = load_env()

    smtp_host = env.get("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(env.get("SMTP_PORT", "587"))
    smtp_user = env.get("SMTP_USER", "")
    smtp_pass = env.get("SMTP_PASS", "")
    email_to = env.get("EMAIL_TO", "kaiceo@naver.com")
    email_from = env.get("EMAIL_FROM", smtp_user)

    if not smtp_user or not smtp_pass:
        print("  SMTP 설정이 없어 이메일을 전송할 수 없습니다.")
        return False

    if is_expired:
        urgency = "만료됨"
        color = "#d93025"
        subject = f"[긴급] Meta 광고 API 토큰이 만료되었습니다!"
    elif remaining_days <= 3:
        urgency = f"{remaining_days}일 남음"
        color = "#d93025"
        subject = f"[긴급] Meta 광고 API 토큰 만료 {remaining_days}일 전"
    else:
        urgency = f"{remaining_days}일 남음"
        color = "#e37400"
        subject = f"[경고] Meta 광고 API 토큰 만료 {remaining_days}일 전"

    exp_str = exp_date.strftime("%Y-%m-%d %H:%M") if exp_date else "알 수 없음"

    html = f"""
<html>
<head>
<style>
  body {{ font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; color: #333; }}
  .alert-box {{ background: {color}; color: white; padding: 20px; border-radius: 8px; margin: 16px 0; }}
  .alert-box h2 {{ margin: 0 0 8px 0; }}
  .steps {{ background: #f8f9fa; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid {color}; }}
  .steps ol {{ margin: 8px 0; padding-left: 20px; }}
  .steps li {{ margin: 4px 0; }}
  code {{ background: #e8e8e8; padding: 2px 6px; border-radius: 3px; font-size: 13px; }}
  .footer {{ color: #9e9e9e; font-size: 12px; margin-top: 24px; }}
</style>
</head>
<body>

<div class="alert-box">
  <h2>Meta 광고 API 토큰 만료 경고</h2>
  <p>상태: <strong>{urgency}</strong> | 만료일: {exp_str}</p>
</div>

<p>토큰이 만료되면 <strong>매주 월요일 자동 리포트가 중단</strong>됩니다.<br>
아래 절차에 따라 토큰을 갱신해주세요.</p>

<div class="steps">
  <strong>토큰 갱신 방법</strong>
  <ol>
    <li><a href="https://developers.facebook.com/tools/explorer/">Meta Graph API Explorer</a> 접속</li>
    <li>앱: <strong>kitt_자동화</strong> 선택</li>
    <li><strong>Generate Access Token</strong> 클릭 (ads_read 권한 체크)</li>
    <li>터미널에서 장기 토큰으로 교환:
      <br><code>cd ai-agent && source .venv/bin/activate</code>
      <br><code>python3 scripts/meta_token.py --exchange "새토큰" --save</code>
    </li>
    <li>GitHub Secret 업데이트:
      <br><code>gh secret set META_ACCESS_TOKEN --body "새장기토큰"</code>
    </li>
  </ol>
</div>

<p class="footer">
  이 메일은 메타광고 자동화 시스템의 토큰 만료 모니터링에서 발송되었습니다.
</p>

</body>
</html>
"""

    if dry_run:
        print(f"  [DRY-RUN] 경고 이메일 전송")
        print(f"    수신: {email_to}")
        print(f"    제목: {subject}")
        return True

    msg = MIMEMultipart()
    msg["Subject"] = subject
    msg["From"] = email_from
    msg["To"] = email_to
    msg.attach(MIMEText(html, "html", "utf-8"))

    try:
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.starttls(context=SSL_CONTEXT)
        server.login(smtp_user, smtp_pass)
        server.sendmail(email_from, [email_to], msg.as_string())
        server.quit()
        print(f"  경고 이메일 전송 완료 → {email_to}")
        return True
    except Exception as e:
        print(f"  이메일 전송 실패: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(description="Meta 토큰 만료 체크 + 경고 이메일")
    parser.add_argument("--warn-days", type=int, default=7, help="만료 N일 전부터 경고 (기본: 7)")
    parser.add_argument("--dry-run", action="store_true", help="테스트 모드")

    args = parser.parse_args()

    env = load_env()
    access_token = env.get("META_ACCESS_TOKEN", "")
    app_id = env.get("META_APP_ID", "")
    app_secret = env.get("META_APP_SECRET", "")

    if not access_token:
        print("  META_ACCESS_TOKEN이 설정되지 않았습니다.")
        sys.exit(1)

    print("=" * 60)
    print("  Meta 토큰 만료 체크")
    print(f"  시간: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)

    exp_date, remaining, is_valid = check_token_expiry(access_token, app_id, app_secret)

    if not is_valid:
        print(f"\n  토큰 상태: 만료/무효")
        send_warning_email(0, exp_date, True, args.dry_run)
        sys.exit(1)

    if exp_date:
        print(f"\n  토큰 상태: 유효")
        print(f"  만료일: {exp_date.strftime('%Y-%m-%d %H:%M')}")
        print(f"  남은 일수: {remaining}일")

        if remaining <= args.warn_days:
            print(f"\n  경고: 만료 {args.warn_days}일 이내!")
            send_warning_email(remaining, exp_date, False, args.dry_run)
        else:
            print(f"\n  정상: 만료까지 {remaining}일 남음 (경고 기준: {args.warn_days}일)")
    else:
        print(f"\n  토큰 상태: 유효 (만료 없음)")


if __name__ == "__main__":
    main()
