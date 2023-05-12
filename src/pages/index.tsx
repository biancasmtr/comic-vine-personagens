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

  return (
    <div className="bg-gray-200 h-screen">
      <div className="container mx-auto py-12">
        <div className="bg-white rounded-lg shadow-lg px-8 py-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 underline">Pesquisar personagem</h1>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-1/2 flex items-center border-b border-gray-400 py-2 mb-6">
              <input
                type="text"
                placeholder="Digite o nome do personagem"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
              <button
                className="bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setSearchTerm("")}
              >
                Limpar
              </button>
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
                      <span className="block p-4 text-lg font-bold text-red-700 hover:underline">{c.name} </span>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Home;
