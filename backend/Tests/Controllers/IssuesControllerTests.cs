//using Application.Services.Interfaces;
//using Application.UseCases.CreateIssue;
//using Application.UseCases.DeleteIssue;
//using Application.UseCases.GetAllIssues;
//using Application.UseCases.GetIssue;
//using Application.UseCases.UpdateIssue;
//using AutoMapper;
//using Domain.Entities;
//using Domain.Interfaces;
//using Microsoft.AspNetCore.Mvc;
//using Moq;
//using Web.Controllers;

//namespace Tests.Controllers
//{
//    public class IssuesControllerTests
//    {
//        private readonly IssuesController _controller;
//        private readonly Mock<IIssueRepository> _mockIssueRepository;
//        private readonly Mock<IMapper> _mockMapper;
//        private readonly Mock<IFileStorage> _fileStorage;

//        public IssuesControllerTests()
//        {
//            _mockIssueRepository = new Mock<IIssueRepository>();
//            _mockMapper = new Mock<IMapper>();
//            _fileStorage = new Mock<IFileStorage>();

//            var getAllIssue = new GetAllIssueUseCase(_mockIssueRepository.Object);
//            var getIssue = new GetIssueUseCase(_mockIssueRepository.Object);
//            var createIssue = new CreateIssueUseCase(_mockIssueRepository.Object, _mockMapper.Object, _fileStorage.Object);
//            var updateIssue = new UpdateIssueUseCase(_mockIssueRepository.Object, _mockMapper.Object);
//            var deleteIssue = new DeleteIssueUseCase(_mockIssueRepository.Object);

//            _controller = new IssuesController(getAllIssue, getIssue, createIssue, updateIssue, deleteIssue);
//        }

//        //[Fact]
//        //public async Task GetAllIssues_ReturnsOk()
//        //{
//        //    // Arrange
//        //    var issues = new List<Issue>
//        //    {
//        //        new Issue { Id = Guid.NewGuid(), Title = "яма", Description = "на дороге" },
//        //        new Issue { Id = Guid.NewGuid(), Title = "мусор", Description = "около подъезда" },
//        //        new Issue { Id = Guid.NewGuid(), Title = "дорого", Description = "дорогие товары" }
//        //    };
//        //    var issuesDtos = new List<GetAllIssueResponse>
//        //    {
//        //        new GetAllIssueResponse(issues[0].Id, issues[0].Title),
//        //        new GetAllIssueResponse(issues[1].Id, issues[1].Title),
//        //        new GetAllIssueResponse(issues[2].Id, issues[2].Title),
//        //    };

//        //    _mockIssueRepository.Setup(repo => repo.GetAll()).ReturnsAsync(issues);
//        //    _mockMapper.Setup(mapper => mapper.Map<IEnumerable<GetAllIssueResponse>>(issues)).Returns(issuesDtos);

//        //    // Act
//        //    var result = await _controller.GetAllIssues();

//        //    // Assert
//        //    var okResult = Assert.IsType<OkObjectResult>(result);
//        //    var returnValue = Assert.IsAssignableFrom<IEnumerable<GetAllIssueResponse>>(okResult.Value);
//        //    Assert.NotNull(returnValue);
//        //    Assert.Equal(3, returnValue.Count());

//        //    foreach (var expected in issuesDtos)
//        //    {
//        //        Assert.Contains(returnValue, i => i.Id == expected.Id && i.Title == expected.Title);
//        //    }
//        //}

//        //[Fact]
//        //public async Task GetIssue_ReturnsOk()
//        //{
//        //    // Arrange
//        //    var id = Guid.NewGuid();
//        //    var issue = new Issue { Id = id, Title = "яма", Description = "на дороге" };
//        //    var issueDto = new GetIssueResponse(id, "яма", "на дороге");

//        //    _mockIssueRepository.Setup(repo => repo.GetById(id)).ReturnsAsync(issue);
//        //    _mockMapper.Setup(mapper => mapper.Map<GetIssueResponse?>(issue)).Returns(issueDto);

//        //    // Act
//        //    var result = await _controller.GetIssue(id);

//        //    // Assert
//        //    var okResult = Assert.IsType<OkObjectResult>(result);
//        //    var returnValue = Assert.IsType<GetIssueResponse>(okResult.Value);
//        //    Assert.NotNull(returnValue);
//        //    Assert.Equal(id, returnValue.Id);
//        //}

//        [Fact]
//        public async Task GetIssue_ReturnsNotFound()
//        {
//            // Arrange
//            var id = Guid.NewGuid();

//            _mockIssueRepository.Setup(repo => repo.GetById(id)).ReturnsAsync((Issue?)null);
//            _mockMapper.Setup(mapper => mapper.Map<GetIssueResponse?>(It.IsAny<Issue>())).Returns((GetIssueResponse?)null);

//            // Act
//            var result = await _controller.GetIssue(id);

//            // Assert
//            var notFoundResult = Assert.IsType<NotFoundResult>(result);
//        }

//        [Fact]
//        public async Task GetIssue_ReturnsBadRequest_WhenModelStateIsInvalid()
//        {
//            // Arrange
//            _controller.ModelState.AddModelError("id", "Invalid ID");

//            // Act
//            var result = await _controller.GetIssue(Guid.Empty);

//            // Assert
//            Assert.IsType<BadRequestResult>(result);
//        }

//        [Fact]
//        public async Task AddIssue_ReturnsOk()
//        {
//            // Arrange
//            var issue = new Issue() { Id = Guid.NewGuid() };

//            _mockMapper.Setup(mapper => mapper.Map<Issue>(It.IsAny<CreateIssueRequest>())).Returns(issue);
//            _mockIssueRepository.Setup(repo => repo.Add(issue)).ReturnsAsync(issue.Id);

//            // Act
//            var result = await _controller.AddIssue(It.IsAny<CreateIssueRequest>());

//            // Assert
//            var okResult = Assert.IsType<OkObjectResult>(result);
//            var returnValue = Assert.IsType<Guid>(okResult.Value);
//            Assert.Equal(issue.Id, returnValue);
//        }

//        [Fact]
//        public async Task AddIssue_ReturnsBadRequest()
//        {
//            // Arrange
//            var issue = new Issue() { Id = Guid.NewGuid() };

//            _mockMapper.Setup(mapper => mapper.Map<Issue>(It.IsAny<CreateIssueRequest>())).Returns(issue);
//            _mockIssueRepository.Setup(repo => repo.Add(issue)).ReturnsAsync((Guid?)null);

//            // Act
//            var result = await _controller.AddIssue(It.IsAny<CreateIssueRequest>());

//            // Assert
//            var okResult = Assert.IsType<BadRequestResult>(result);
//        }

//        [Fact]
//        public async Task AddIssue_ReturnsBadRequest_WhenModelStateIsInvalid()
//        {
//            // Arrange
//            _controller.ModelState.AddModelError("Title", "Required field");

//            // Act
//            var result = await _controller.AddIssue(It.IsAny<CreateIssueRequest>());

//            // Assert
//            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
//            Assert.Equal("Not valid", badRequestResult.Value);
//        }

//        [Fact]
//        public async Task UpdateIssue_ReturnOk()
//        {
//            // Arrange
//            var id = Guid.NewGuid();
//            var issueDto = new UpdateIssueRequest(id, "яма", "на дороге");
//            var issue = new Issue() { Id = id };

//            _mockMapper.Setup(mapper => mapper.Map<Issue>(issueDto)).Returns(issue);
//            _mockIssueRepository.Setup(repo => repo.IsExist(issue.Id)).ReturnsAsync(true);
//            _mockIssueRepository.Setup(repo => repo.Update(issue)).ReturnsAsync(true);

//            // Act
//            var result = await _controller.UpdateIssue(issueDto);

//            // Assert
//            var okResult = Assert.IsType<OkResult>(result);

//            _mockIssueRepository.Verify(repo => repo.Update(It.Is<Issue>(i => i.Id == id)), Times.Once);
//        }

//        [Fact]
//        public async Task UpdateIssue_ReturnNotFound()
//        {
//            // Arrange
//            var id = Guid.NewGuid();
//            var issueDto = new UpdateIssueRequest(id, "яма", "на дороге");
//            var issue = new Issue() { Id = id };
//            _mockMapper.Setup(mapper => mapper.Map<Issue>(issueDto)).Returns(issue);
//            _mockIssueRepository.Setup(repo => repo.IsExist(issue.Id)).ReturnsAsync(false);

//            // Act
//            var result = await _controller.UpdateIssue(issueDto);

//            // Assert
//            var okResult = Assert.IsType<NotFoundResult>(result);
//        }

//        [Fact]
//        public async Task RemoveIssue_ReturnOk()
//        {
//            // Arrange
//            var id = Guid.NewGuid();
//            var issue = new Issue() { Id = id };

//            _mockIssueRepository.Setup(repo => repo.GetById(id)).ReturnsAsync(issue);
//            _mockIssueRepository.Setup(repo => repo.Delete(issue)).ReturnsAsync(true);

//            // Act
//            var result = await _controller.RemoveIssue(id);

//            // Assert
//            var okResult = Assert.IsType<OkResult>(result);

//            _mockIssueRepository.Verify(repo => repo.Delete(It.Is<Issue>(i => i.Id == id)), Times.Once);
//        }

//        [Fact]
//        public async Task RemoveIssue_ReturnNotFound()
//        {
//            // Arrange
//            var id = Guid.NewGuid();
//            var issue = new Issue() { Id = id };
//            _mockIssueRepository.Setup(repo => repo.GetById(id)).ReturnsAsync((Issue?)null);

//            // Act
//            var result = await _controller.RemoveIssue(id);

//            // Assert
//            var okResult = Assert.IsType<NotFoundResult>(result);
//        }
//    }
//}
