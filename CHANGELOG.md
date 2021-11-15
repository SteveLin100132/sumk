# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2021-11-15

### Changed

- 使用率上拋服務開發模板，調整 `execute` 及 `setSchedule` 回傳結果

## [1.0.1] - 2021-11-15

### Removed

- 使用率上拋服務開發模板，移除 `CRON` 排程設定，統一由 `setSchedule` 方法配置排程

## [1.0.0] - 2021-11-12

### Added

- 建立使用率上拋服務開發模板
  - 內建針對特定系統 By 廠別查詢使用次數
  - 內建針對特定系統 By 廠別查詢使用持續時間
  - 可客製使用率的查詢方式
- 建立重新上拋使用率的 API，預設端口 3010
  - 重新上拋昨日的使用率
  - 重新上拋特定時間的使用率
  - 重新上拋特定時間範圍的使用率
  - 重新上拋昨日特定廠別的使用率
  - 重新上拋特定時間特定廠別的使用率
  - 重新上拋特定時間範圍特定廠別的使用率