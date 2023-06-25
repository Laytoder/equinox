export default function chartConfig(
  priceData: [number, number][],
  title: string
) {
  return {
    title: {
      text: title,
    },
    series: [
      {
        data: priceData,
        name: title,
      },
    ],
  };
}
