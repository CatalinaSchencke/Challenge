export default function Title(props: { text: string }) {
    return (
        <h2 className="font-semibold text-xl">{props.text}</h2>
    );
}