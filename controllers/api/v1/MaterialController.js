const MaterialRepository = require('../../../models/repositories/MaterialRepository');
const { resCode, errorMessage, genRes } = require('../../../config/options');

exports.getAllMaterial = async (req, res) => {
  try {
    const resp = await MaterialRepository.getAllMaterial();
    return res.status(resCode.HTTP_OK).json(genRes(resCode.HTTP_OK, resp));
  } catch (e) {
    // customErrorLogger(e);
    console.log('error', e);
    const error = errorMessage.SERVER_ERROR;
    return res
      .status(resCode.HTTP_INTERNAL_SERVER_ERROR)
      .json(genRes(resCode.HTTP_INTERNAL_SERVER_ERROR, error));
  }
};
exports.postCreateAndEdit = async (req, res) => {
  try {
    const resp = await MaterialRepository.createAndUpdate(req.body);
    return res.status(resCode.HTTP_OK).json(genRes(resCode.HTTP_OK, resp));
  } catch (e) {
    // customErrorLogger(e);
    console.log('error', e);
    const error = errorMessage.SERVER_ERROR;
    return res
      .status(resCode.HTTP_INTERNAL_SERVER_ERROR)
      .json(genRes(resCode.HTTP_INTERNAL_SERVER_ERROR, error));
  }
};
exports.delete = async (req, res) => {
  try {
    const resp = await MaterialRepository.update(req?.body?.id, req.body);
    return res.status(resCode.HTTP_OK).json(genRes(resCode.HTTP_OK, resp));
  } catch (e) {
    // customErrorLogger(e);
    console.log('error', e);
    const error = errorMessage.SERVER_ERROR;
    return res
      .status(resCode.HTTP_INTERNAL_SERVER_ERROR)
      .json(genRes(resCode.HTTP_INTERNAL_SERVER_ERROR, error));
  }
};
