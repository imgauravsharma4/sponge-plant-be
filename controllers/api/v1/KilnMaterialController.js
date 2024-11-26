const KilnMaterialRepository = require('../../../models/repositories/KilnMaterialRepository');
const { resCode, errorMessage, genRes } = require('../../../config/options');

exports.getAllKilnMaterial = async (req, res) => {
  try {
    const resp = await KilnMaterialRepository.getAllKiln();
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
    const resp = await KilnMaterialRepository.createAndUpdate(req.body);
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
