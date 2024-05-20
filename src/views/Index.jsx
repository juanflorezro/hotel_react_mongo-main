import CardHotel from "../components/CardHotel";

export default function Index(){

    return (
        <>
            <div className="mx-auto">
                <div className="grid grid-cols-12 gap-5 justify-center">
                    <CardHotel/>
                </div>
            </div>
        </>
    );
}