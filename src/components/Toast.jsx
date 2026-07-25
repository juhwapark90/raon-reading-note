export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="toast" key={message}>
      {message}
    </div>
  );
}
