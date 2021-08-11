using System.Security.Claims;
using System.Threading.Tasks;
using API.Errors;
using API.Extentions;
using AutoMapper;
using Core.Entities.Identity;
using Infrastructure.Dtos;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<AppUser> _signInManger;
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(UserManager<AppUser> userManager,
                  SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper)
        {
           

           _signInManger = signInManager;
           _userManager = userManager;
           _tokenService = tokenService;
           _mapper = mapper;
        
        }



       [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentuser()
        {

            var user = await _userManager.FindByEmailFromClaimsPrinciple(User);

           return  new UserDto 
             {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName

             };
        }


      [HttpGet("emailexists")]
      public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
      {
          return await _userManager.FindByEmailAsync(email) != null;
      }


      [Authorize]
      [HttpGet("address")]
      public async Task<ActionResult<AddressDto>> GetUserAddress()
      {
            

             var user = await _userManager.FindByEmailWithAddressAsync(User);

             return _mapper.Map<Address,AddressDto>(user.Address);

      }

     [Authorize]
     [HttpPut("address")]

     public async Task<ActionResult<AddressDto>> UpdateUserAdress(AddressDto address) 
     {

           var user =  await _userManager.FindByEmailWithAddressAsync(User);

           user.Address = _mapper.Map<AddressDto, Address>(address);

           var result = await _userManager.UpdateAsync(user);

          if(result.Succeeded) return Ok(_mapper.Map<Address, AddressDto>(user.Address));

          return BadRequest("problem updating the user");


     }

      

        

      [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {   
            var user =  await _userManager.FindByEmailAsync(loginDto.Email);

            if(user == null) return Unauthorized(new ApiResponse(401));

            var  result = await _signInManger.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if(!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDto 
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
            
        } 




     [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var user = new AppUser
            { 
                  DisplayName = registerDto.DisplayName,
                  Email = registerDto.Email,
                  UserName = registerDto.Email,
                
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if(!result.Succeeded) return BadRequest(new ApiResponse(400));

            return new UserDto 
            {
                DisplayName = user.DisplayName,
                Token = "This will be a token",
                Email = user.Email
            };
        }
    }
}