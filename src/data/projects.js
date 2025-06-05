import { projects } from "../data/projects";

function Projects() {
  return (
    <section className="p-8">
      <h2 className="text-3xl font-bold mb-6">Proyectos</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map(proj => (
          <div key={proj.id} className="border p-4 rounded shadow-md">
            <img src={proj.image} alt={proj.title} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-4">{proj.title}</h3>
            <p>{proj.description}</p>
            <p className="text-sm mt-2 text-gray-500">{proj.tech.join(", ")}</p>
            <div className="mt-4 flex gap-2">
              <a href={proj.github} className="text-blue-600">GitHub</a>
              <a href={proj.demo} className="text-green-600">Demo</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
