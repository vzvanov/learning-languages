
export const getAllWords = async (baseLang: string, learningLang: string) => {
  const url = `/api/dictionary/${baseLang}/${learningLang}`;
  const response = await fetch(url,
    {
      next: { revalidate: 60 },
    });
  if (response.ok) return response.json();

  throw new Error("Unable to fetch words.");
};

export const getNextWordToLearn = async (baseLang: string, learningLang: string) => {
  const url = `/api/next-for-learning/${baseLang}/${learningLang}`;
  const response = await fetch(url);
  if (response.ok) return response.json();

  throw new Error("Unable to fetch words.");
};
