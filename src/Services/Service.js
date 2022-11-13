export default function getClassName(...args) {
  const className = args
    .map((x) => {
      if (x) return ` ${x}`;
      return ``;
    })
    .join("")
    .trim();

  return className;
}
