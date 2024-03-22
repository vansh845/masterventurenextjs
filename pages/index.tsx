import { MouseEvent, useEffect, useState } from "react"
import { AwardCategory } from "../types"
import Image from "next/image";
import Button from "../components/button";
import ModalComp from "../components/modal";



export default function Test() {
    const [selectedNominees, setSelectedNominees] = useState<any>({});
    const [awards, setAwards] = useState<AwardCategory[]>([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/ballots');
            const data = await res.json();

            setAwards(data.items);
        }
        fetchData();
    }, [])

    const handleNomineeSelect = (awardId: string, nomineeId: string) => {
        if (selectedNominees[awardId] == nomineeId) {
            setSelectedNominees({
                ...selectedNominees,
                [awardId]: null,
            });
            return;

        }
        setSelectedNominees({
            ...selectedNominees,
            [awardId]: nomineeId,
        });
    };



    return (
        <div>
            <h1 className="text-2xl font-bold text-center">Awards 2024</h1>
            {awards.map((award) => (
                <div key={award.id} className=" rounded-lg p-4 mb-6">
                    <div className="font-bold text-xl mb-2 bg-gray-200 p-4">{award.title}</div>
                    <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-3 gap-4 ">
                        {award.items.map((nominee) => (
                            <div key={nominee.id} className="relative shadow-lg rounded-md items-center justify-center flex flex-col p-4">
                                <p className="text-center font-semibold my-2">{nominee.title}</p>
                                <img src={nominee.photoUrL} alt={nominee.title} className="object-fill h-40 w-40 overflow-hidden rounded-full shadow-md shadow-gray-400 mb-2" />
                                <button className="inline-flex items-center px-3 py-2 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600"
                                    onClick={e => handleNomineeSelect(award.id, nominee.id)}>
                                    {selectedNominees[award.id] == nominee.id ? 'Selected' : 'Select'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            ))}
            <ModalComp data={selectedNominees} />


        </div>
    )
}