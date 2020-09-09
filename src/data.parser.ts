import { Band, Player, Plays, Expected } from './data.interface';
import { Request, Response } from "express";
import { band } from "./data";

function sortbyNameAndAge(band: Band) {
  const players = [...band.members.current, ...band.members.past];

  // Sort by name
  players.sort(function (a, b) {
    var nameA = a.name.toLowerCase(),
      nameB = b.name.toLowerCase();
    if (nameA < nameB)
      //sort string ascending
      return -1;
    if (nameA > nameB) {
      return 1;
    }

    return 0; //default return value (no sorting)
  });

  // Sort by age
  players.sort(function (a, b) {
    return b.age - a.age;
  });

  const sortedPlayerNames = players.reduce((acc, curr) => {
    acc.push(curr.name.toLowerCase());
    return acc;
  }, []);

  return sortedPlayerNames;
}

function groupBy(role: string, players: Player[]): string[] {
  const playerNames: string[] = [];

  players.map((player) => {
    return player.plays.map((plays: string) => {
      if (plays === role) {
        playerNames.push(player.name.toLowerCase());
      }
    });
  });

  return playerNames;
}

function groupPlayersByRole(band: Band): Plays {
  const players = [...band.members.current, ...band.members.past];

  return players.reduce(
    (acc, _) => ({
      ...acc,
      vocals: groupBy("vocals", players),
      synth: groupBy("synth", players),
      guitar: groupBy("guitar", players),
      bass: groupBy("bass", players),
      drums: groupBy("drums", players),
    }),
    {} as Plays
  );
}

function parseBandData(band: Band): Expected {
  const parsedBand = {
    ...band,
    members: { ...band.members, all: sortbyNameAndAge(band) },
    plays: groupPlayersByRole(band)
  };

  return parsedBand;
}

export const rootHandler = (_req: Request, res: Response) => {
  const data = parseBandData(band);
  return res.send(data);
};
