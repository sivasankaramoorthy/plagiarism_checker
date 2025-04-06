import PlagiarismChecker from '@/components/plagiarism-checker';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-900 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#303030_1px,transparent_1px),linear-gradient(to_bottom,#303030_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <div className="text-center space-y-4 mb-12">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary dark:bg-primary/20 mb-2">
            Academic Integrity Tool
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Semantic Plagiarism Checker
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Upload your document and discover semantically similar papers using
            advanced AI technology.
          </p>
        </div>

        <div className="absolute -top-16 -left-16 -z-10 h-[30rem] w-[30rem] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -top-16 -right-16 -z-10 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-3xl"></div>
        <PlagiarismChecker />
      </div>
    </main>
  );
}
