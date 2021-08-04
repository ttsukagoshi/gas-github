// MIT License
//
// Copyright (c) 2021 Taro TSUKAGOSHI
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

/* exported LocalizedMessage */

const MESSAGES = {
  en: {
    sampleMessage: 'This is a sample file written in JavaScript.',
    sampleMessageWithPlaceholders:
      'Your sample is awesome, {{name}}! Great job!',
    sampleMessageThatsNotIncludedInOtherLanguages:
      'The default language could contain messages not translated to other languages.',
  },
  ja: {
    sampleMessage: 'これはJavaScriptで書かれたサンプルファイル',
    sampleMessageWithPlaceholders:
      'これは素晴らしいサンプルですよ、{{name}}さん！',
  },
};

class LocalizedMessage {
  constructor(userLocale) {
    this.DEFAULT_LOCALE = 'en';
    this.locale = MESSAGES[userLocale] ? userLocale : this.DEFAULT_LOCALE;
    this.messageList = MESSAGES[this.locale];
    Object.keys(MESSAGES[this.DEFAULT_LOCALE]).forEach((key) => {
      if (!this.messageList[key]) {
        this.messageList[key] = MESSAGES[this.DEFAULT_LOCALE][key];
      }
    });
  }
  /**
   * Replace placeholder values in the designated text. String.prototype.replace() is executed using regular expressions with the 'global' flag on.
   * @param {string} text
   * @param {array} placeholderValues Array of objects containing a placeholder string expressed in regular expression and its corresponding value.
   * @returns {string} The replaced text.
   */
  replacePlaceholders_(text, placeholderValues = []) {
    let replacedText = placeholderValues.reduce(
      (acc, cur) => acc.replace(new RegExp(cur.regexp, 'g'), cur.value),
      text
    );
    return replacedText;
  }
  /**
   * Replace placeholder string in this.messageList.sampleMessageWithPlaceholders
   * @param {string} name
   * @returns {string} The replaced text.
   */
  replaceSampleMessageWithPlaceholders(name) {
    let text = this.messageList.sampleMessageWithPlaceholders;
    let placeholderValues = [
      {
        regexp: '{{name}}',
        value: name,
      },
    ];
    text = this.replacePlaceholders_(text, placeholderValues);
    return text;
  }
}