import youtubeService from "@/services/youtube.service";

export const GET = async () => {
  const result = await youtubeService.parseFirstVideo("UtopiaShow");
  return Response.json(result);
};
