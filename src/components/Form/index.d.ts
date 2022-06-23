export type FormProps = {
  loading?: boolean;
  onClear?: () => void;
  onSubmit(value: string): void;
};
