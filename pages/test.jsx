export default function page() {
  return (
    <form
      action="/api/product/create"
      method="POST"
      enctype="multipart/form-data"
    >
      <input type="text" name="name" />
      <br />
      <textarea name="description"></textarea>
      <br />
      <input type="number" name="price" />
      <br />
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  );
}
