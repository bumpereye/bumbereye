import { Metadata } from '../types/metadata.type';

export type RecognizePlateResponseDTO = {
  imgHeight: number;
  imgWidth: number;
  plate: string;
  recognitionPlateProcessingTimeMs: number;
  searchingPlateProcessingTimeMs: number;
  startDate: number;
  metadata: Metadata;
};
