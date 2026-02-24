import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, BrainCircuit } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import catalog from '@/lib/course-data/catalog.json';
import { CatalogSchema } from '@/lib/course-data/schema';

const courses = CatalogSchema.parse(catalog);

const iconMap = {
  'book-open': <BookOpen className="h-8 w-8 text-primary" />,
  'brain-circuit': <BrainCircuit className="h-8 w-8 text-primary" />,
};

export default function Home() {
  const getImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-12 px-4 md:px-8 border-b bg-card">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-headline font-bold text-primary">AcademIA UNIAT</h1>
          <p className="mt-4 text-xl text-muted-foreground">Tu plataforma de aprendizaje inteligente.</p>
        </div>
      </header>
      <main className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-headline font-bold mb-8 text-center">Catálogo de Cursos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => {
              const image = getImage(course.id);
              return (
                <Card key={course.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col group">
                  <CardHeader className="p-0 relative">
                    {image && (
                      <div className="overflow-hidden">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          width={600}
                          height={400}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          data-ai-hint={image.imageHint}
                        />
                      </div>
                    )}
                     <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg mt-1">
                          {iconMap[course.icon]}
                        </div>
                        <div>
                          <CardTitle className="font-headline text-2xl">{course.title}</CardTitle>
                          <CardDescription className="mt-2">{course.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow" />
                  <CardFooter>
                    <Link href={course.href} passHref className="w-full">
                      <Button className="w-full font-bold">
                        Iniciar Curso <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
       <footer className="py-6 border-t text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} AcademIA UNIAT. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
