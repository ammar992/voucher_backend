import mongoose from 'mongoose';

const voucherSchema = mongoose.Schema({
  voucherDate: { type: String, required: true },
  voucherCurrency: { type: String, required: true },
  exchangeRate: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  item: [
    {
      account: { type: String },
      type: { type: String, enum: ['debit', 'credit'] },
      amount: { type: Number, required: true },
    },
  ],
});

export const Voucher = mongoose.model('Voucher', voucherSchema);
