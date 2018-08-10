import { TRequest } from "../ILenneth";
export interface IMulterOptions {
  dest?: string;
  storage?: any;
  limits?: ILimits;
  fileFilter?: (
    req: TRequest,
    file,
    cb: (error: Error | null, acceptFile: boolean) => void
  ) => void;
}

interface ILimits {
  /** Max field name size (Default: 100 bytes) */
  fieldNameSize?: number;
  /** Max field value size (Default: 1MB) */
  fieldSize?: number;
  /** Max number of non- file fields (Default: Infinity) */
  fields?: number;
  /** For multipart forms, the max file size (in bytes)(Default: Infinity) */
  fileSize?: number;
  /** For multipart forms, the max number of file fields (Default: Infinity) */
  files?: number;
  /** For multipart forms, the max number of parts (fields + files)(Default: Infinity) */
  parts?: number;
  /** For multipart forms, the max number of header key=> value pairs to parse Default: 2000(same as node's http). */
  headerPairs?: number;
  /** Keep the full path of files instead of just the base name (Default: false) */
  preservePath?: boolean;
}
