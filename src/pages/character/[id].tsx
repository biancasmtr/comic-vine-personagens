import { FC, useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";

const urlBase = "https://comicvine.gamespot.com/api/";
const route = "character";
const prefixNumber = 4005;
const apiKey = "2ae15e78ab553e040b833132f5a39218a57cccab";
const format = "json";

type CharacterProps = {
  character: {
    id: number;
    name: string;
    real_name: string;
    aliases: string;
    gender: number;
    birth: string;
    image: {
      original_url: string;
    };
  };
};

const Character: FC<CharacterProps> = ({ character }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="container mx-auto py-8 px-8 min-h-100vh">
      <header>
        <title>Comic Vine - Detalhes personagens</title>
      </header>
      <div className="container mx-auto py-8 bg-white rounded-lg shadow-lg px-8 min-h-100vh">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white bg-red-700 bg-opacity-75 px-4 py-2 rounded-md">
            {character.name}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:mr-10 mb-6 md:mb-0 flex justify-center">
            {character.image && (
              <>
                <img
                  src={character.image.original_url}
                  alt={character.name}
                  className="rounded-lg shadow-md"
                  width={300}
                />
                <div className="flex justify-between mb-2">
                  {currentImageIndex > 0 && (
                    <button
                      className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                      onClick={handlePreviousImage}
                    >
                      Anterior
                    </button>
                  )}
                  {currentImageIndex < character.image.length - 1 && (
                    <button
                      className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                      onClick={handleNextImage}
                    >
                      Próxima
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="text-left">
            <div className="mb-4">
              <strong className="mr-2">Nome real:</strong>
              {character.real_name == null ? (
                <span className="text-red-500">Não possui essa informação</span>
              ) : (
                character.real_name
              )}
            </div>
            <div className="mb-4">
              <strong className="mr-2">Outros nomes:</strong>
              {character.aliases == null ? (
                <span>Não possui este dado</span>
              ) : (character.aliases)}
            </div>
            <div className="mb-4">
              <strong className="mr-2">Data de Nascimento:</strong>
              {character.birth == null ? (
                <span className="text-red-500">Não possui essa informação</span>
              ) : (
                character.birth
              )}
            </div>
            <div className="mb-4">
              <strong className="mr-2">Gênero:</strong>
              {character.gender === 1 ? "Masculino" : "Feminino"}
            </div>
          </div>
        </div>
        <button className="mb-4 px-8 py-2 mt-8 text-white bg-red-700 rounded-lg hover:bg-red-800 focus:outline-none focus:bg-red-800 block mx-auto w-full md:w-auto">
          <Link href="/">
            <span>Voltar</span>
          </Link>
        </button>
      </div>
    </div>
  );

};

export default Character;

export const getServerSideProps: GetServerSideProps = async (param) => {
  const { id } = param.query;
  const route = `character/${prefixNumber}-${id}`;
  const response = await axios.get(
    `${urlBase}${route}?api_key=${apiKey}&format=${format}`
  );
  const character = response.data.results;

  return {
    props: {
      character: character,
    },
  };
};
