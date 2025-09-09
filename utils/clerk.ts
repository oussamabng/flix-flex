export function getClerkError(error: unknown): string {
  if (typeof error === 'object' && error && 'errors' in error) {
    const errs = (error as any).errors;
    return errs?.[0]?.message ?? 'Something went wrong';
  }
  return 'Unexpected error';
}
