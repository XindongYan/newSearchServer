const { newModel } = require('../models/newModel');
// 分词模块
const Segment = require('segment');

module.exports = {
  search: async (ctx, next) => {
    const { params } = ctx.query;
    let result = void 0;

    const paramsArray = [];

    for (const p_s of params.split(/\s+/)) {
      paramsArray.push(p_s);
    };

    if (paramsArray.length === 1) {
      const segment = new Segment();
      segment.useDefault();

      const wordArray = segment.doSegment(paramsArray[0]);

      paramsArray.length = 0;

      for (const w of wordArray) {
        paramsArray.push(w.w)
      }
    }

    result = await newModel.find({ 'index.keyword': { $all: paramsArray } }, 'url title time text').exec();
    if (result.length === 0) {
      result = await newModel.find({ title: { $regex: paramsArray[0], $options: 'i' } }, 'url title time text').exec();
    }

    for (const r of result) {
      for (const p of paramsArray) {
        const index = r.text.indexOf(paramsArray[0]);

        if (index !== -1) {
          let text = r.text.replace(paramsArray[0], `<a style="color: red">${paramsArray[0]}</a>`);
          r.text = text;
        };
      };
    };

    ctx.body = {
      code: 200,
      result
    };

  }
}