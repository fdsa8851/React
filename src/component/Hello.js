import World from "./World";

export default function Hello() {

    return (
        <div className="Box">
            <h1 style= {{

                color: "#f00",
                borderRight : " 12px solid #000",
                marginBottom : "50px",
                opacity : 1,
            }}
            >
            Hello!!</h1>
            <World />
        </div>
    );
};
