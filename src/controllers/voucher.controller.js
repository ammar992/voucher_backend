import { Voucher } from '../models/voucher.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';



///////////////////// create voucher

const createVoucher = asyncHandler(async (req, res, next) => {
  const { voucherDate, voucherCurrency, exchangeRate, user, item } = req.body;

  if (!voucherDate || !voucherCurrency || !exchangeRate || !user) {
    res
      .status(403)
      .json(new ApiResponse(403, 'empty field is not allowed', ''));
    return;
  }
  if (item.length <= 0) {
    res
      .status(403)
      .json(new ApiResponse(403, 'empty field is not allowed', ''));
    return;
  }
  const create = await Voucher.create(req.body);
  res
    .status(200)
    .json(new ApiResponse(200, 'voucher created successfully', create));
});


////////////////////// find All Voucher

const findAllVoucher = asyncHandler(async (req, res) => {
  const getAllVoucher = await Voucher.find({ user: req.user._id });
  res
    .status(200)
    .json(new ApiResponse(200, 'voucher get successfully', getAllVoucher));
});


////////////////////// update Voucher

const updateVoucher = asyncHandler(async (req, res) => {
  const { voucherDate, voucherCurrency, exchangeRate, user, item } = req.body;

  if (!voucherDate || !voucherCurrency || !exchangeRate || !user) {
    res
      .status(403)
      .json(new ApiResponse(403, 'empty field is not allowed', ''));
    return;
  }
  if (item.length <= 0) {
    res
      .status(403)
      .json(new ApiResponse(403, 'empty field is not allowed', ''));
    return;
  }
  const update = await Voucher.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res
    .status(200)
    .json(new ApiResponse(200, 'voucher updated successfully', update));
});

export { createVoucher, findAllVoucher, updateVoucher };
