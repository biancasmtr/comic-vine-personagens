import { FC } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const urlBase = "https://comicvine.gamespot.com/api/";
const route = "character/4005";
const apiKey = "2ae15e78ab553e040b833132f5a39218a57cccab";
const format = "json";

type CharacterProps = {
  character: {
    id: number;
    name: string;
    real_name: string;
    aliases: string;
    gender: number;
    image: {
      original_url: string;
    };
  };
};

const Character: FC<CharacterProps> = ({ character }) => {
  const router = useRouter();

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:mr-10 mb-6 md:mb-0">
            <img
              src={character.image.original_url}
              alt={character.name}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-bold mb-4">{character.name}</h1>
            <div className="mb-4">
              <strong className="mr-2">Nome real:</strong>
              {character.real_name}
            </div>
            <div className="mb-4">
              <strong className="mr-2">Outros nomes:</strong>
              {character.aliases}
            </div>
            <div className="mb-4">
              <strong className="mr-2">Gênero:</strong>
              {character.gender === 1 ? "Feminino" : "Masculino"}
            </div>
          </div>
        </div>
        <button
          className="mb-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={() => router.back()}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default Character;

export const getServerSideProps: GetServerSideProps = async (param) => {
  const { id } = param.query;
  const response = await axios.get(
    `${urlBase}${route}-${id}?api_key=${apiKey}&format=${format}`
  );
  const character = response.data.results;
    
  return {
    props: {
      character: character,
    },
  };
};
