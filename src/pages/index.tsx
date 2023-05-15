import { FC, useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { FiList, FiGrid } from "react-icons/fi";

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

enum ViewType {
  List = "list",
  Grid = "grid",
}

const Home: FC<HomeProps> = ({ characters }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState(ViewType.Grid);
  const [displayedCharacters, setDisplayedCharacters] = useState(characters);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const handleToggleView = () => {
    setViewType((prevType) =>
      prevType === ViewType.List ? ViewType.Grid : ViewType.List
    );
  };

  const handleLoadMore = () => {
    const filtered = characters.filter((c: { name: string }) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedCharacters(filtered);
    setShowLoadMore(false);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setDisplayedCharacters(characters);
    setShowLoadMore(false);
  };

  const filteredCharacters = characters.filter((c: { name: string }) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (searchTerm) {
      setDisplayedCharacters(filteredCharacters.slice(0, 4));
      setShowLoadMore(true);
    } else {
      setDisplayedCharacters(characters);
      setShowLoadMore(false);
    }
  }, [searchTerm]);

  return (
    <div className="bg-gray-200 h-screen">
      <header className="bg-white py-6">
        <title>Comic Vine - Personagens</title>
        <div className="container px-8">
          <h1 className="text-4xl font-bold text-red-700 mx-auto text-center text-gray-800">Personagens Comic Vine</h1>
        </div>
      </header>
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-lg px-8 py-10">
          <div className="flex flex-col items-center">
            <div className="flex w-full">
            <div className="flex w-96"></div>
              <div className="w-96 flex items-center  border-b border-gray-400 mb-6">
                <input
                  type="text"
                  placeholder="Digite o nome do personagem"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-sm"
                />
                <button
                  className="bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 mb-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleClearSearch}
                >
                  Limpar
                </button>
              </div>
              <div className="flex justify-end mb-8 mr-8 mt-2 ml-auto">
                {viewType === ViewType.Grid ? (
                  <button
                    className="text-gray-600 hover:text-red-700"
                    onClick={() => setViewType(ViewType.List)}
                  >
                    <FiList size={32} />
                  </button>
                ) : (
                  <button
                    className="text-gray-600 hover:text-red-700"
                    onClick={() => setViewType(ViewType.Grid)}
                  >
                    <FiGrid size={32} />
                  </button>
                )}
              </div>
            </div>

            <div className="text-base font-bold text-gray-700 mb-6">
              {filteredCharacters.length} personagens encontrados
            </div>
            {displayedCharacters.length === 0 ? (
              <div className="text-lg font-bold text-red-500">Lista vazia!</div>
            ) : (
              <div className={`grid ${viewType === ViewType.List ? "grid-cols-1" : "grid-cols-4"} gap-4 ${viewType === ViewType.List ? "w-full" : ""}`}>
                {displayedCharacters.map((c: { id: number; name: string }, index: number) => (
                  <div
                    key={index}
                    className={`border border-gray-200 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition duration-300 ease-in-out ${viewType === ViewType.List ? "text-center" : ""}`}
                  >
                    <Link href={`/character/${c.id}`}>
                      <span className="block p-4 text-lg font-bold text-red-700 hover:underline">{c.name}</span>
                    </Link>
                  </div>
                ))}
              </div>
            )}
            {showLoadMore && (
              <div className="flex justify-center mt-4">
                <button
                  className="mb-4 px-8 py-2 mt-8 text-white bg-red-700 rounded-lg hover:bg-red-800 focus:outline-none focus:bg-red-800 block mx-auto w-full md:w-auto"
                  onClick={handleLoadMore}
                >
                  Carregar Mais
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );


};

export default Home;
