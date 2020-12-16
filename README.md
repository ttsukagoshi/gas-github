# Google Apps ScriptユーザのためのSuper Linter設定ファイルサンプル
[![GitHub Super-Linter](https://github.com/ttsukagoshi/super-linter-for-google-apps-script/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter)
## Super Linterとは
GitHubが作成した、各種言語のlinterをGitHub Actionsとして実行できるもの。Push時やPull Request時などをトリガーとする。（公式資料は[こちら](https://github.com/github/super-linter)）。

## 使い方
フォルダ`.github`を、丸ごと自分が作業しているレポジトリにコピーする。

## 各種エラーへの対応
ESLintが吐き出すエラーの詳細は[こちら](https://eslint.org/docs/rules/)を参照のこと。
### GASでよくあること。
- メニューからの呼び出しなどで使っている関数が`no-unused-vars`エラーとなってしまう。
- 逆に、他ファイルで定義した関数が`no-undef`エラーとして引っかかる場合がある。

例えば、スプレッドシートを開いた時に実行する関数として
```javascript
function myFunction() {
    let test = 'variable';
    console.log(test.length);
}

function onOpen() {
    SpreadsheetApp.getUi()
    .createMenu('test')
    .addItem('これを実行', 'myFunction')
    .addToUi();
}
```
というスクリプトを用意すると、`'myFunction' is defined but never used `と怒られるので、あらかじめファイルの冒頭に
```javascript
/* exported myFunction, myFunction2, ... */
```
と入力することでエラーを回避できる。
また、別ファイルで定義済みの関数や変数について`'LocalizedMessage' is not defined`と怒られるようなときは、同じくスクリプトファイル冒頭に
```javascript
/* global LocalizedMessage, global-var1, global-var2, ... */
```
と入力することでエラーを回避できる。

なお、GAS固有のクラス（`SpreadsheetApp`, `GmailApp`などなど）で、よく使うものは`.eslintrc.yml`内の`globals`にてあらかじめ定義している。必要に応じて、追記する。
