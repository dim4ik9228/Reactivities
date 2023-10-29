using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }

            public class CommandValidator : AbstractValidator<Command>
            {
                public CommandValidator()
                {
                    RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
                }
            }

            public class Handler : IRequestHandler<Command, Result<Unit>>
            {
                private readonly DataContext context;
                private readonly IUserAccessor userAccessor;

                public Handler(DataContext context, IUserAccessor userAccessor)
                {
                    this.context = context;
                    this.userAccessor = userAccessor;
                }
                public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
                {
                    var user = await context.Users.
                    FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUsername());

                    var attendee = new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = request.Activity,
                        IsHost = true
                    };

                    request.Activity.Attendees.Add(attendee);

                    context.Activities.Add(request.Activity);
                    var result = await context.SaveChangesAsync() > 0;

                    if (!result)
                        return Result<Unit>.Failure("Failure to create activity!");

                    return Result<Unit>.Success(Unit.Value);
                }
            }

        }
    }
}