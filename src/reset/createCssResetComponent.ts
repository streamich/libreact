import {h} from '../util';
import toStylesheet from 'freestyler/lib/ast/toStylesheet';
import toCss from 'freestyler/lib/ast/toCss';

const createCssResetComponent = (cssTemplate) => {
  const rawCss = toCss(toStylesheet(cssTemplate));

  return () => h('style', {
    dangerouslySetInnerHTML: {
      __html: rawCss
    }
  });
};

export default createCssResetComponent;
