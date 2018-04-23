## About

Pivotal Tracker の通知をよりリッチに Slack に送るためのものです。
Description の更新時に Diff を表示したり、タスク系の通知ができるようになります。

## Environment

- Cloud Functions

## Usage

./secret.json を作成して、以下のフォーマットで Webhook URL をセットする

```JavaScript:secret.json
{
  "WEBHOOK_URL": ""
}
```

## Deploy Command

```
$ gcloud functions deploy pivotalDiffNotification --trigger-http
```
