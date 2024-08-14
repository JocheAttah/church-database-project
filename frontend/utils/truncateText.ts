function truncateMiddle(text: string = "", maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  const half = Math.floor((maxLength - 3) / 2); // -3 to account for the ellipsis
  return text.slice(0, half) + "..." + text.slice(text.length - half);
}

export { truncateMiddle };
