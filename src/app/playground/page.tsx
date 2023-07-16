import Editor from "../components/Editor";

const Playground = () => {
    return (
        <>
            <div className="flex">
                <div className="w-1/2">
                    <Editor />
                </div>
                <div>result</div>
            </div>
        </>
    )
}

export default Playground;