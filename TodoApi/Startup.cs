using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TodoApi.Data;
using Microsoft.EntityFrameworkCore;

namespace TodoApi
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<TodoContext>(opt =>
               opt.UseInMemoryDatabase("TodoList"));
            services.AddControllers();

            // Adicione esta linha para adicionar suporte CORS
            services.AddCors(options =>
            {
                options.AddPolicy("AllowMyOrigin",
                    builder => builder.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod());
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Adicione esta linha para usar CORS
            app.UseCors("AllowMyOrigin");

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}