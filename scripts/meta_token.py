#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Meta 액세스 토큰 관리 유틸리티

사용법:
  # 단기 토큰 → 장기 토큰(60일) 교환
  python3 scripts/meta_token.py --exchange "단기_USER_TOKEN"

  # 토큰 유효성 검사
  python3 scripts/meta_token.py --check

  # 토큰으로 접근 가능한 광고 계정 목록 조회
  python3 scripts/meta_token.py --accounts
"""

import os
import sys
import json
import ssl
import argparse
import urllib.request
import urllib.parse
import urllib.error

try:
    import certifi
    SSL_CONTEXT = ssl.create_default_context(cafile=certifi.where())
except ImportError:
    SSL_CONTEXT = ssl.create_default_context()

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GRAPH_API_BASE = "https://graph.facebook.com/v21.0"


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
                    value = value.strip().strip('"').strip("'")
                    env_vars[key.strip()] = value
    return env_vars


def api_get(url):
    """GET 요청"""
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, context=SSL_CONTEXT) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")
        try:
            return json.loads(body)
        except json.JSONDecodeError:
            return {"error": {"message": body}}


def exchange_token(short_token, app_id, app_secret):
    """단기 토큰 → 장기 토큰(60일) 교환"""
    params = urllib.parse.urlencode({
        "grant_type": "fb_exchange_token",
        "client_id": app_id,
        "client_secret": app_secret,
        "fb_exchange_token": short_token,
    })
    url = f"{GRAPH_API_BASE}/oauth/access_token?{params}"

    result = api_get(url)

    if "error" in result:
        print(f"\n  토큰 교환 실패: {result['error'].get('message', result['error'])}")
        return None

    long_token = result.get("access_token")
    if long_token:
        print(f"\n  장기 토큰 발급 성공!")
        print(f"  토큰 타입: {result.get('token_type', 'bearer')}")

        # 만료 시간 확인
        expires_in = result.get("expires_in")
        if expires_in:
            days = int(expires_in) // 86400
            print(f"  만료: {days}일 후")

        return long_token
    else:
        print(f"\n  예상치 못한 응답: {result}")
        return None


def check_token(access_token, app_id, app_secret):
    """토큰 유효성 검사"""
    params = urllib.parse.urlencode({
        "input_token": access_token,
        "access_token": f"{app_id}|{app_secret}",
    })
    url = f"{GRAPH_API_BASE}/debug_token?{params}"

    result = api_get(url)

    if "error" in result:
        print(f"\n  토큰 검사 실패: {result['error'].get('message', '')}")
        return False

    data = result.get("data", {})
    is_valid = data.get("is_valid", False)

    print(f"\n  토큰 상태: {'유효' if is_valid else '만료/무효'}")
    print(f"  앱 ID: {data.get('app_id', '-')}")
    print(f"  사용자 ID: {data.get('user_id', '-')}")

    if data.get("expires_at"):
        from datetime import datetime
        exp = datetime.fromtimestamp(data["expires_at"])
        remaining = (exp - datetime.now()).days
        print(f"  만료일: {exp.strftime('%Y-%m-%d %H:%M')} ({remaining}일 남음)")

    scopes = data.get("scopes", [])
    if scopes:
        print(f"  권한: {', '.join(scopes)}")

    # ads_read 권한 확인
    if "ads_read" not in scopes:
        print(f"\n  ads_read 권한이 없습니다!")
        print(f"  Graph API Explorer에서 ads_read 권한을 추가해주세요.")

    return is_valid


def list_ad_accounts(access_token):
    """접근 가능한 광고 계정 목록 조회"""
    params = urllib.parse.urlencode({
        "access_token": access_token,
        "fields": "name,account_id,account_status,currency,business_name",
        "limit": 100,
    })
    url = f"{GRAPH_API_BASE}/me/adaccounts?{params}"

    result = api_get(url)

    if "error" in result:
        print(f"\n  광고 계정 조회 실패: {result['error'].get('message', '')}")
        return

    accounts = result.get("data", [])
    if not accounts:
        print(f"\n  접근 가능한 광고 계정이 없습니다.")
        print(f"  ads_read 권한이 있는지 확인해주세요.")
        return

    print(f"\n  광고 계정 {len(accounts)}개 발견:")
    print(f"  {'─' * 60}")
    for acc in accounts:
        status_map = {1: "활성", 2: "비활성", 3: "미결제", 7: "보류", 100: "정지"}
        status = status_map.get(acc.get("account_status", 0), "알 수 없음")
        print(f"  {acc.get('id', '-'):20s}  {acc.get('name', '-'):20s}  [{status}]")
        if acc.get("business_name"):
            print(f"  {'':20s}  비즈니스: {acc['business_name']}")
    print(f"  {'─' * 60}")
    print(f"\n  위 계정 ID를 config/clients.json의 ad_account_id에 입력하세요.")


def update_env_file(key, value):
    """.env 파일의 특정 키 업데이트"""
    env_path = os.path.join(PROJECT_ROOT, ".env")
    lines = []

    if os.path.exists(env_path):
        with open(env_path, "r") as f:
            lines = f.readlines()

    # 기존 키 찾아서 업데이트
    found = False
    for i, line in enumerate(lines):
        if line.strip().startswith(f"{key}="):
            lines[i] = f'{key}="{value}"\n'
            found = True
            break

    if not found:
        lines.append(f'{key}="{value}"\n')

    with open(env_path, "w") as f:
        f.writelines(lines)

    print(f"  .env 파일 업데이트 완료: {key}")


def main():
    parser = argparse.ArgumentParser(description="Meta 액세스 토큰 관리")
    parser.add_argument("--exchange", type=str, metavar="SHORT_TOKEN",
                        help="단기 토큰을 장기 토큰(60일)으로 교환")
    parser.add_argument("--check", action="store_true",
                        help="현재 토큰 유효성 검사")
    parser.add_argument("--accounts", action="store_true",
                        help="접근 가능한 광고 계정 목록")
    parser.add_argument("--save", action="store_true",
                        help="교환된 장기 토큰을 .env에 자동 저장")

    args = parser.parse_args()

    env = load_env()
    app_id = env.get("META_APP_ID", "")
    app_secret = env.get("META_APP_SECRET", "")
    access_token = env.get("META_ACCESS_TOKEN", "")

    if args.exchange:
        if not app_id or not app_secret:
            print("  .env에 META_APP_ID와 META_APP_SECRET이 필요합니다.")
            sys.exit(1)

        print("=" * 60)
        print("  단기 토큰 → 장기 토큰 교환")
        print("=" * 60)

        long_token = exchange_token(args.exchange, app_id, app_secret)
        if long_token:
            print(f"\n  장기 토큰:")
            print(f"  {long_token[:50]}...")

            if args.save:
                update_env_file("META_ACCESS_TOKEN", long_token)
            else:
                print(f"\n  .env에 자동 저장하려면 --save 옵션을 추가하세요:")
                print(f"  python3 scripts/meta_token.py --exchange \"토큰\" --save")

    elif args.check:
        if not access_token:
            print("  .env에 META_ACCESS_TOKEN이 필요합니다.")
            sys.exit(1)

        print("=" * 60)
        print("  토큰 유효성 검사")
        print("=" * 60)
        check_token(access_token, app_id, app_secret)

    elif args.accounts:
        if not access_token:
            print("  .env에 META_ACCESS_TOKEN이 필요합니다.")
            sys.exit(1)

        print("=" * 60)
        print("  광고 계정 목록 조회")
        print("=" * 60)
        list_ad_accounts(access_token)

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
