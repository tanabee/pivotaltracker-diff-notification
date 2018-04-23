## 概要

Pivotal Tracker の通知をよりリッチに Slack に送るためのものです。
Description の更新時に Diff を表示したり、タスク系の通知ができるようになります。

## Usage

./secret.json を作成して、以下のフォーマットで Webhook URL をセットする

```JavaScript:secret.json
{
  "WEBHOOK_URL": ""
}
```

## 動作環境

- Cloud Functions
