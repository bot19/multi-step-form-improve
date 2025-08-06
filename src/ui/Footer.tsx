export const Footer = () => {
  const COMMIT_VERSION = import.meta.env.VITE_GITHUB_SHA;

  return (
    <footer className="flex justify-center items-center h-12 mb-4 text-gray-500 text-sm invisible">
      v{__APP_VERSION__} ({COMMIT_VERSION ?? 'local'})
    </footer>
  );
};
