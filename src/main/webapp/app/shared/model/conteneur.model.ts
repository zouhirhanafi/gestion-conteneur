import dayjs from 'dayjs';
import { StatutConteneur } from 'app/shared/model/enumerations/statut-conteneur.model';

export interface IConteneur {
  id?: number;
  statut?: StatutConteneur | null;
  dateEntree?: string | null;
  dateSortie?: string | null;
  zone?: number | null;
  ligne?: number | null;
  colonne?: number | null;
  commentaire?: string | null;
}

export const defaultValue: Readonly<IConteneur> = {};
