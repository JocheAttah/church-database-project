const formatters = (decimalPoints: number | undefined) => {
  const formatOptions = {
    style: "currency",
    currency: "NGN",
    ...(Number.isInteger(decimalPoints) && {
      minimumFractionDigits: decimalPoints,
    }),
  } satisfies Intl.NumberFormatOptions;

  const formatOptionsCompact = {
    notation: "compact",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    roundingMode: "trunc",
  } satisfies Intl.NumberFormatOptions;

  const locale = "en-NG";

  return {
    standard: new Intl.NumberFormat(locale, formatOptions),
    compact: new Intl.NumberFormat(locale, {
      ...formatOptions,
      ...formatOptionsCompact,
    }),
  };
};

type FormatMoneyOptions = {
  decimalPoints?: number;
  shouldRoundDown?: boolean;
  roundDownAmount?: number;
};

const formatMoney = (
  money: string | number = 0,
  options: FormatMoneyOptions = {},
) => {
  const {
    decimalPoints = 0,
    shouldRoundDown = options.roundDownAmount || false,
    roundDownAmount = 999_999,
  } = options;

  const amount = Number(money);
  const { standard, compact } = formatters(decimalPoints);
  const roundDown = shouldRoundDown && amount > roundDownAmount;

  return roundDown ? compact.format(amount) : standard.format(amount);
};

export default formatMoney;
