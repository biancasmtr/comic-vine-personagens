import { FC } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

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
            <img
              src={character.image.original_url}
              alt={character.name}
              className="rounded-lg shadow-md"
              width={300}
            />
          </div>
          <div className="text-left">
            <div className="mb-4">
              <strong className="mr-2">Nome real:</strong>
              {character.real_name == null ? <span className="text-red-500">Não possui essa informação</span> : character.real_name}
            </div>

            <div className="mb-4">
              <strong className="mr-2">Outros nomes:</strong>
              {character.aliases == null ? "Não possui este dado" : character.aliases}
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
