using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
            "http://locathost:5173",
            "http://127.0.0.1:5173"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors();

var dataFile = Path.Combine(
    app.Environment.ContentRootPath,
    "spotify-data.json"
);

app.MapPost("/api/spotify-data", async (JsonElement data) =>
{
    try
    {
        await File.WriteAllTextAsync(
            dataFile,
            JsonSerializer.Serialize(
                data,
                new JsonSerializerOptions {WriteIndented = true}
            )
        );

        return Results.Ok(new {message = "Data saved successfully"});
    }
    catch (IOException)
    {
        return Results.Problem("Could not save Spotify Data.");
    }
});

app.MapGet("/api/spotify-data", async () =>
{
    if (!File.Exists(dataFile))
    {
        return Results.NotFound(
            new { error = "No saved Spotify data found." }
        );
    }

    try
    {
        var json = await File.ReadAllTextAsync(dataFile);

        return Results.Content(json, "application/json");
    }
    catch (IOException)
    {
        return Results.Problem("Could not read Spotify data.");
    }
});

app.Run();

