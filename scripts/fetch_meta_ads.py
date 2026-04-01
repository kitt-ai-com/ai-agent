#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Meta Marketing API에서 광고 데이터를 가져와
기존 분석 스크립트(analyze_meta_ad_full.py)가 기대하는 CSV 형식으로 변환

사용법:
  python3 scripts/fetch_meta_ads.py --account act_123456789
  python3 scripts/fetch_meta_ads.py --account act_123456789 --days 7
  python3 scripts/fetch_meta_ads.py --account act_123456789 --output input/meta-ad/업체명/

필요 환경변수:
  META_ACCESS_TOKEN: Meta Marketing API 액세스 토큰

Meta 액세스 토큰 발급 방법:
  1. https://developers.facebook.com 에서 앱 생성
  2. Marketing API 제품 추가
  3. 도구 > 액세스 토큰 디버거에서 토큰 발급
  4. 필요 권한: ads_read, ads_management
"""

import os
import sys
import json
import ssl
import argparse
import urllib.request
import urllib.parse
import urllib.error
from datetime import datetime, timedelta

try:
    import certifi
    SSL_CONTEXT = ssl.create_default_context(cafile=certifi.where())
except ImportError:
    SSL_CONTEXT = ssl.create_default_context()

# 프로젝트 루트
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Meta Graph API 기본 URL
GRAPH_API_VERSION = "v21.0"
GRAPH_API_BASE = f"https://graph.facebook.com/{GRAPH_API_VERSION}"

# API 필드 → 한글 컬럼 매핑
# 분석 스크립트가 기대하는 핵심 컬럼: 광고 이름, 광고 게재, 결과, 지출 금액 (USD), 노출, 링크 클릭
INSIGHT_FIELDS = [
    "ad_name",
    "campaign_name",
    "adset_name",
    "impressions",
    "reach",
    "frequency",
    "spend",
    "cpm",
    "clicks",
    "ctr",
    "cpc",
    "actions",
    "cost_per_action_type",
    "inline_link_clicks",
    "inline_link_click_ctr",
    "cost_per_inline_link_click",
]

AD_FIELDS = [
    "name",
    "effective_status",
]


def get_access_token():
    """환경변수에서 Meta 액세스 토큰 가져오기"""
    token = os.environ.get("META_ACCESS_TOKEN")
    if not token:
        # .env 파일에서 로드 시도
        env_path = os.path.join(PROJECT_ROOT, ".env")
        if os.path.exists(env_path):
            with open(env_path, "r") as f:
                for line in f:
                    line = line.strip()
                    if line.startswith("META_ACCESS_TOKEN="):
                        token = line.split("=", 1)[1].strip().strip('"').strip("'")
                        break

    if not token:
        print("META_ACCESS_TOKEN 환경변수를 설정해주세요.")
        print("")
        print("방법 1: .env 파일에 추가")
        print('  META_ACCESS_TOKEN="your_token_here"')
        print("")
        print("방법 2: 환경변수 직접 설정")
        print('  export META_ACCESS_TOKEN="your_token_here"')
        print("")
        print("토큰 발급: https://developers.facebook.com/tools/explorer/")
        sys.exit(1)

    return token


def api_request(endpoint, params=None):
    """Meta Graph API 요청"""
    if params is None:
        params = {}

    url = f"{GRAPH_API_BASE}/{endpoint}"
    if params:
        url += "?" + urllib.parse.urlencode(params)

    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, context=SSL_CONTEXT) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        try:
            error_json = json.loads(error_body)
            error_msg = error_json.get("error", {}).get("message", error_body)
        except json.JSONDecodeError:
            error_msg = error_body
        print(f"  API 오류 ({e.code}): {error_msg}")
        return None


def fetch_ad_insights(account_id, access_token, date_start, date_end):
    """광고 계정의 광고별 인사이트 가져오기"""
    print(f"  기간: {date_start} ~ {date_end}")

    # 1단계: 광고 목록 조회 (상태 포함)
    print(f"  광고 목록 조회 중...")
    ads_data = {}
    endpoint = f"{account_id}/ads"
    params = {
        "access_token": access_token,
        "fields": ",".join(AD_FIELDS),
        "limit": 500,
    }

    result = api_request(endpoint, params)
    if not result:
        return None

    for ad in result.get("data", []):
        ads_data[ad["name"]] = {
            "effective_status": ad.get("effective_status", "UNKNOWN"),
        }

    # 페이지네이션
    while result.get("paging", {}).get("next"):
        next_url = result["paging"]["next"]
        # next URL에서 endpoint와 params 추출
        try:
            req = urllib.request.Request(next_url)
            with urllib.request.urlopen(req, context=SSL_CONTEXT) as response:
                result = json.loads(response.read().decode("utf-8"))
                for ad in result.get("data", []):
                    ads_data[ad["name"]] = {
                        "effective_status": ad.get("effective_status", "UNKNOWN"),
                    }
        except Exception:
            break

    print(f"  광고 {len(ads_data)}개 발견")

    # 2단계: 광고별 인사이트 조회
    print(f"  인사이트 데이터 조회 중...")
    endpoint = f"{account_id}/insights"
    params = {
        "access_token": access_token,
        "fields": ",".join(INSIGHT_FIELDS),
        "level": "ad",
        "time_range": json.dumps({"since": date_start, "until": date_end}),
        "limit": 500,
    }

    result = api_request(endpoint, params)
    if not result:
        return None

    insights = result.get("data", [])

    # 페이지네이션
    while result.get("paging", {}).get("next"):
        try:
            req = urllib.request.Request(result["paging"]["next"])
            with urllib.request.urlopen(req, context=SSL_CONTEXT) as response:
                result = json.loads(response.read().decode("utf-8"))
                insights.extend(result.get("data", []))
        except Exception:
            break

    print(f"  인사이트 {len(insights)}건 수집 완료")
    return insights, ads_data, date_start, date_end


def extract_action_value(actions, action_type):
    """actions 배열에서 특정 action_type의 value 추출"""
    if not actions:
        return ""
    for action in actions:
        if action.get("action_type") == action_type:
            return action.get("value", "")
    return ""


def extract_cost_per_action(cost_per_actions, action_type):
    """cost_per_action_type 배열에서 특정 action_type의 value 추출"""
    if not cost_per_actions:
        return ""
    for item in cost_per_actions:
        if item.get("action_type") == action_type:
            return item.get("value", "")
    return ""


def status_to_korean(status):
    """Meta API 상태를 한글로 변환"""
    mapping = {
        "ACTIVE": "active",
        "PAUSED": "inactive",
        "DELETED": "inactive",
        "ARCHIVED": "inactive",
        "IN_PROCESS": "active",
        "WITH_ISSUES": "active",
        "CAMPAIGN_PAUSED": "inactive",
        "ADSET_PAUSED": "inactive",
        "DISAPPROVED": "inactive",
        "PENDING_REVIEW": "inactive",
        "PREAPPROVED": "inactive",
    }
    return mapping.get(status, "inactive")


def convert_to_csv(insights, ads_data, date_start, date_end, currency="USD"):
    """API 데이터를 분석 스크립트가 기대하는 CSV 형식으로 변환"""

    cur = currency.upper()

    # CSV 헤더 (통화 단위 반영)
    headers = [
        "보고 시작",
        "보고 종료",
        "광고 이름",
        "캠페인 이름",
        "광고 세트 이름",
        "광고 게재",
        "통화",
        "기여 설정",
        "결과",
        "결과 표시 도구",
        "도달",
        "빈도",
        "결과당 비용",
        "광고 세트 예산",
        "광고 세트 예산 유형",
        f"지출 금액 ({cur})",
        "종료",
        "품질 순위",
        "참여율 순위",
        "전환율 순위",
        "노출",
        f"CPM(1,000회 노출당 비용) ({cur})",
        "링크 클릭",
        "shop_clicks",
        f"CPC(링크 클릭당 비용) ({cur})",
        "CTR(링크 클릭률)",
        "클릭(전체)",
        "CTR(전체)",
        f"CPC(전체) ({cur})",
        "랜딩 페이지 조회",
        f"랜딩 페이지 조회당 비용 ({cur})",
    ]

    rows = []
    for insight in insights:
        ad_name = insight.get("ad_name", "")
        campaign_name = insight.get("campaign_name", "-")
        adset_name = insight.get("adset_name", "-")
        actions = insight.get("actions", [])
        cost_per_actions = insight.get("cost_per_action_type", [])

        # 리드 수 (lead 또는 기타 결과)
        leads = extract_action_value(actions, "lead")
        if not leads:
            leads = extract_action_value(actions, "offsite_conversion.fb_pixel_lead")
        lead_result_type = "actions:lead" if leads else ""

        # 리드당 비용
        cost_per_lead = extract_cost_per_action(cost_per_actions, "lead")
        if not cost_per_lead:
            cost_per_lead = extract_cost_per_action(
                cost_per_actions, "offsite_conversion.fb_pixel_lead"
            )

        # 광고 상태
        ad_info = ads_data.get(ad_name, {})
        status = status_to_korean(ad_info.get("effective_status", "UNKNOWN"))

        # 랜딩 페이지 조회
        landing_views = extract_action_value(actions, "landing_page_view")
        spend = float(insight.get("spend", 0))
        landing_cost = ""
        if landing_views and float(landing_views) > 0:
            landing_cost = f"{spend / float(landing_views):.6f}"

        row = [
            date_start,                                          # 보고 시작
            date_end,                                            # 보고 종료
            ad_name,                                             # 광고 이름
            campaign_name,                                       # 캠페인 이름
            adset_name,                                          # 광고 세트 이름
            status,                                              # 광고 게재
            cur,                                                 # 통화
            "클릭 후 7일 또는 조회 후 1일",                         # 기여 설정
            leads,                                               # 결과
            lead_result_type,                                    # 결과 표시 도구
            insight.get("reach", "0"),                           # 도달
            insight.get("frequency", "0"),                       # 빈도
            cost_per_lead,                                       # 결과당 비용
            "캠페인 예산 사용",                                    # 광고 세트 예산
            "0",                                                 # 광고 세트 예산 유형
            insight.get("spend", "0"),                           # 지출 금액 (USD)
            "진행 중",                                            # 종료
            "-",                                                 # 품질 순위
            "-",                                                 # 참여율 순위
            "-",                                                 # 전환율 순위
            insight.get("impressions", "0"),                     # 노출
            insight.get("cpm", "0"),                             # CPM
            insight.get("inline_link_clicks", ""),               # 링크 클릭
            "",                                                  # shop_clicks
            insight.get("cost_per_inline_link_click", ""),       # CPC
            insight.get("inline_link_click_ctr", ""),            # CTR(링크 클릭률)
            insight.get("clicks", "0"),                          # 클릭(전체)
            insight.get("ctr", "0"),                             # CTR(전체)
            insight.get("cpc", ""),                              # CPC(전체)
            landing_views or "",                                 # 랜딩 페이지 조회
            landing_cost,                                        # 랜딩 페이지 조회당 비용
        ]

        rows.append(row)

    return headers, rows


def save_csv(headers, rows, output_path):
    """CSV 파일로 저장"""
    import csv

    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(headers)
        writer.writerows(rows)

    print(f"  CSV 저장 완료: {output_path}")
    print(f"  광고 수: {len(rows)}개")


def main():
    parser = argparse.ArgumentParser(description="Meta Marketing API 광고 데이터 수집")
    parser.add_argument("--account", type=str, required=True, help="광고 계정 ID (예: act_123456789)")
    parser.add_argument("--days", type=int, help="조회 기간 - 최근 N일 (기본: 7, --date-start/--date-end와 함께 사용 불가)")
    parser.add_argument("--date-start", type=str, help="시작 날짜 (형식: YYYY-MM-DD)")
    parser.add_argument("--date-end", type=str, help="종료 날짜 (형식: YYYY-MM-DD)")
    parser.add_argument("--output", type=str, help="CSV 출력 디렉토리 (기본: input/meta-ad/)")
    parser.add_argument("--filename", type=str, help="CSV 파일명 (기본: 자동 생성)")
    parser.add_argument("--currency", type=str, default="USD", help="통화 단위 (기본: USD)")

    args = parser.parse_args()

    print("=" * 70)
    print("  Meta Marketing API 데이터 수집")
    print("=" * 70)

    # 액세스 토큰
    access_token = get_access_token()
    print(f"\n  광고 계정: {args.account}")

    # 기간 계산
    if args.date_start and args.date_end:
        # 명시적 날짜 범위 사용
        date_start = args.date_start
        date_end = args.date_end
    elif args.days:
        # 최근 N일
        date_end = datetime.now().strftime("%Y-%m-%d")
        date_start = (datetime.now() - timedelta(days=args.days)).strftime("%Y-%m-%d")
    else:
        # 기본값: 최근 7일
        date_end = datetime.now().strftime("%Y-%m-%d")
        date_start = (datetime.now() - timedelta(days=7)).strftime("%Y-%m-%d")

    # API 호출
    result = fetch_ad_insights(args.account, access_token, date_start, date_end)
    if not result:
        print("\n  데이터 수집 실패")
        sys.exit(1)

    insights, ads_data, date_start, date_end = result

    if not insights:
        print("\n  해당 기간에 광고 데이터가 없습니다.")
        sys.exit(0)

    # CSV 변환
    headers, rows = convert_to_csv(insights, ads_data, date_start, date_end, args.currency)

    # 출력 경로
    output_dir = args.output or os.path.join(PROJECT_ROOT, "input", "meta-ad")
    if args.filename:
        output_path = os.path.join(output_dir, args.filename)
    else:
        date_str = datetime.now().strftime("%Y%m%d")
        output_path = os.path.join(output_dir, f"meta_ads_{args.account}_{date_str}.csv")

    save_csv(headers, rows, output_path)

    print(f"\n{'=' * 70}")
    print(f"  수집 완료!")
    print(f"  다음 단계: python3 scripts/analyze_meta_ad_full.py --csv \"{output_path}\"")
    print(f"{'=' * 70}")

    return output_path


if __name__ == "__main__":
    main()
