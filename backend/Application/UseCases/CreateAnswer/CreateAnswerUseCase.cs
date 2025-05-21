using Application.Dtos;
using Application.Services.Interfaces;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.CreateAnswer
{
    public class CreateAnswerUseCase : ICreateAnswerUseCase
    {
        private readonly IAnswerRepository _answerRepo;
        private readonly IIssueRepository _issueRepo;
        private readonly IFileStorage _fileStorage;
        private readonly ICacheService _cache;

        public CreateAnswerUseCase(IAnswerRepository answerRepo, IIssueRepository issueRepo, IFileStorage fileStorage, ICacheService cache)
        {
            _answerRepo = answerRepo;
            _issueRepo = issueRepo;
            _fileStorage = fileStorage;
            _cache = cache;
        }

        public async Task<AnswerDto?> Execute(CreateAnswerRequest request)
        {
            var access = await _issueRepo.CheckModeratorToIssueAccess(request.ModeratorId, request.IssueId);
            if (!access) return null;

            List<AnswerImage> imageUris = new List<AnswerImage>();
            if (request.Images != null)
            {
                foreach (var image in request.Images)
                {
                    var uri = await _fileStorage.SaveImageAsync(image);

                    var issueImage = new AnswerImage
                    {
                        Uri = uri
                    };
                    imageUris.Add(issueImage);
                }
            }

            var oldStatus = await _issueRepo.ChangeStatus(request.IssueId, request.UpdateStatus);

            if (oldStatus == null) return null;

            var answer = new Answer
            {
                IssueId = request.IssueId,
                ModeratorId = request.ModeratorId,
                OldStatus = oldStatus.Value,
                NewStatus = request.UpdateStatus,
                Images = imageUris,
                Text = request.Text
            };

            var newAnswer = await _answerRepo.AddAnswer(answer);
            if (newAnswer == null) return null;

            var answerDto = new AnswerDto(newAnswer.Id, 
                newAnswer.Moderator.FullName, 
                newAnswer.OldStatus, newAnswer.NewStatus,
                newAnswer.Images.Select(im => im.Uri).ToList(),
                newAnswer.Text, newAnswer.CreatedAt);

            string cacheKey = $"AllAnswers_{request.IssueId}";
            await _cache.RemoveAsync(cacheKey);
            
            return answerDto;
        }
    }
}
