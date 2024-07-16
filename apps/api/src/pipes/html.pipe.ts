import { HttpException, Injectable, PipeTransform } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class HtmlPipe implements PipeTransform {
  constructor(
    private readonly fields: string[],
    private readonly exceptionType: 'ws' | 'http',
  ) {}

  private isValidHtml(htmlString: string) {
    const htmlRegexp =
      /<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2>/i;
    return htmlRegexp.test(htmlString);
  }

  private throwError(message: string) {
    if (this.exceptionType === 'ws') {
      throw new WsException(message);
    }
    if (this.exceptionType === 'http') {
      throw new HttpException(message, 400);
    }
  }

  transform(value: { [key: string]: unknown }) {
    console.log({ value, fields: this.fields });
    for (const field of this.fields) {
      const fieldValue = value[field];
      if (!fieldValue) {
        return this.throwError(`Field ${field} does not exist`);
      }
      if (typeof fieldValue !== 'string') {
        return this.throwError(`Value of ${field} is not a string`);
      }

      const validHtml = this.isValidHtml(fieldValue as string);
      console.log({ validHtml });
      if (!validHtml) {
        return this.throwError(`Value of field ${field} is invalid`);
      }
    }
    return value;
  }
}
