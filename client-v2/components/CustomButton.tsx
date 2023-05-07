type PropType = {
  text: string;
  handler?: () => void;
};

export default function customButton({ text, handler }: PropType) {
  return <button onClick={handler}>{text}</button>;
}
