import { test, expect } from "@playwright/test";

test.describe("API Demo Tests", () => {
  test("GET request to JSONPlaceholder", async ({ request }) => {
    const response = await request.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(response.headers()).toHaveProperty("content-type");
    expect(response.headers()["content-type"]).toContain("application/json");

    const data = await response.json();
    expect(data).toHaveProperty("id", 1);
    expect(data).toHaveProperty("title");

    expect(data.title.length).toBeGreaterThan(0);
  });

  test("API POST request", async ({ request }) => {
    const newPost = {
      title: "Test Post",
      body: "This is a test post created by Playwright",
      userId: 1,
    };

    const response = await request.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        data: newPost,
      }
    );

    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("id");
    expect(responseBody.title).toBe(newPost.title);
    expect(responseBody.body).toBe(newPost.body);
    expect(responseBody.userId).toBe(newPost.userId);
  });

  test("API error handling", async ({ request }) => {
    // Test with invalid endpoint
    const response = await request.get(
      "https://jsonplaceholder.typicode.com/posts/999999"
    );

    // This API returns 404 for non-existent resources
    expect(response.status()).toBe(404);

    const responseBody = await response.json();
    expect(Object.keys(responseBody)).toHaveLength(0);
  });
});
