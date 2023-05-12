import { FC, useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const urlBase = 'https://comicvine.gamespot.com/api/';
const route = 'characters';
const apiKey = '2ae15e78ab553e040b833132f5a39218a57cccab';
const format = 'json';

export async function getServerSideProps() {
  const response = await axios.get(`${urlBase}${route}?api_key=${apiKey}&format=${format}`);
  const characters = response.data.results;

  return {
    props: {
      characters,
    },
  };
}

type HomeProps = {
  characters: any;
};

const Home: FC<HomeProps> = ({ characters }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCharacters = characters.filter((c: { name: string }) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // return (
  //   <div className="container mx-auto">
  //     <div className="flex flex-col items-center py-10">
  //       <div className="text-3xl font-bold underline mb-4">
  //         <div className="flex flex-row items-center">
  //           <input
  //             type="text"
  //             placeholder="Pesquisar personagem"
  //             value={searchTerm}
  //             onChange={(e) => setSearchTerm(e.target.value)}
  //             className="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //           />
  //           <button
  //             className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
  //             onClick={() => setSearchTerm("")}
  //           >
  //             Limpar
  //           </button>
  //         </div>
  //       </div>
  //       {filteredCharacters.length === 0 ? (
  //         <div className="text-lg font-bold text-red-500">Lista vazia!</div>
  //       ) : (
  //         <div className="grid grid-cols-3 gap-4">
  //           {filteredCharacters.map((c: { id: number; name: string }, index: number) => (
  //             <div
  //               key={index}
  //               className="border border-gray-200 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition duration-300 ease-in-out"
  //             >
  //               <Link href={`/character/${c.id}`}>
  //                 <span className="block p-4 text-lg font-bold text-blue-600 hover:underline">{c.name} </span>
  //               </Link>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );  

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center py-10">
        <div className="text-3xl font-bold underline mb-4">
          <div className="flex flex-row items-center">
            <input
              type="text"
              placeholder="Pesquisar personagem"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md"
            />
            <button
              className="px-6 py-2 ml-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 shadow-md"
              onClick={() => setSearchTerm("")}
            >
              Limpar
            </button>
          </div>
        </div>
        {filteredCharacters.length === 0 ? (
          <div className="text-lg font-bold text-red-500">Lista vazia!</div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredCharacters.map((c: { id: number; name: string }, index: number) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition duration-300 ease-in-out"
              >
                <Link href={`/character/${c.id}`}>
                  <span className="block p-4 text-lg font-bold text-blue-600 hover:underline">{c.name}</span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
};

export default Home;
